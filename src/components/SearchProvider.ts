// 检索抽象层：优先 Pagefind（构建后生成于 /pagefind/），dev 模式回退到内存索引。
// 设计文档 §8.1：searchProvider 可替换，未来要上浏览器端 embedding 不改动 UI。
// 本期为关键词全文检索（Pagefind + 内存 fallback）。

import snippets from '../../docs/snippets/data/snippets.json'
import questions from '../../docs/questions/data/questions.json'
import projects from '../../docs/projects/_data/projects.json'

export interface SearchHit {
  url: string
  title: string
  excerpt: string // 含 <mark> 高亮，需 v-html 渲染
  type: '笔记' | '片段' | '项目' | '面试题' | '页面'
}

interface PagefindResult {
  url: string
  excerpt: string
  meta: { title?: string; [k: string]: unknown }
  subresult?: boolean
}

interface MemoryDoc {
  url: string
  title: string
  text: string
  type: SearchHit['type']
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pagefind: any = null
let initPromise: Promise<unknown> | null = null
let memoryIndex: MemoryDoc[] | null = null

export function isSearchAvailable(): boolean {
  return pagefind !== null || memoryIndex !== null
}

// Pagefind 产物在站点根 /pagefind/pagefind.js，构建后才有（dev 模式无此文件）。
// 用 script 注入动态加载，避免 Rollup 构建期静态解析绝对路径报错。
function loadPagefindScript(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // @ts-ignore - window 仅客户端存在
    if (typeof window !== 'undefined' && (window as any).pagefind) {
      // @ts-ignore
      return resolve((window as any).pagefind)
    }
    const sc = document.createElement('script')
    sc.src = src
    sc.async = true
    sc.onload = () => {
      // @ts-ignore
      ;(window as any).pagefind ? resolve((window as any).pagefind) : reject(new Error('pagefind global missing'))
    }
    sc.onerror = () => reject(new Error('pagefind script load failed'))
    document.head.appendChild(sc)
  })
}

async function getPagefind() {
  if (pagefind) return pagefind
  if (initPromise) return initPromise
  initPromise = (async () => {
    try {
      const base = (import.meta.env.BASE_URL as string | undefined) || '/'
      // 保证 base 以 / 结尾，避免拼接出 //pagefind
      const normalized = base.endsWith('/') ? base : base + '/'
      const src = new URL(normalized + 'pagefind/pagefind.js', window.location.href).href
      pagefind = await loadPagefindScript(src)
      await pagefind.options?.({})
      return pagefind
    } catch {
      pagefind = null
      initPromise = null
      return null
    }
  })()
  return initPromise
}

function inferType(url: string): SearchHit['type'] {
  if (url.includes('/notes/')) return '笔记'
  if (url.includes('/snippets/')) return '片段'
  if (url.includes('/questions/')) return '面试题'
  if (url.includes('/projects/')) return '项目'
  return '页面'
}

function cleanTitle(raw: string | undefined, url: string): string {
  if (raw && raw.trim()) return raw.trim()
  const seg = url.split('#')[0].replace(/\/$/, '').split('/').pop() || url
  return decodeURIComponent(seg)
}

function normalizeUrl(url: string): string {
  return url.replace(/\.html$/, '').replace(/index$/, '')
}

function parseFrontmatter(raw: string): { title?: string; tags?: string[]; description?: string; body: string } {
  const trimmed = raw.replace(/^\uFEFF/, '')
  const m = trimmed.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!m) {
    return { body: trimmed }
  }
  const yaml = m[1]
  const body = m[2]
  const result: { title?: string; tags?: string[]; description?: string; body: string } = { body }
  for (const line of yaml.split('\n')) {
    const tm = line.match(/^title:\s*(.+)$/)
    if (tm) {
      result.title = tm[1].trim().replace(/^["']|["']$/g, '')
      continue
    }
    const dm = line.match(/^description:\s*(.+)$/)
    if (dm) {
      result.description = dm[1].trim().replace(/^["']|["']$/g, '')
      continue
    }
    const tagm = line.match(/^tags:\s*\[(.*)\]\s*$/)
    if (tagm) {
      result.tags = tagm[1]
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
      continue
    }
    const tagLine = line.match(/^-\s*(.+)$/)
    if (tagLine && /^tags:/.test(yaml.split('\n').find((l) => l.includes('tags:')) || '')) {
      // list-style tags
      if (!result.tags) result.tags = []
      result.tags.push(tagLine[1].trim().replace(/^["']|["']$/g, ''))
    }
  }
  return result
}

function extractFirstHeading(body: string): string | undefined {
  const m = body.match(/^#{1,6}\s+(.+)$/m)
  return m ? m[1].replace(/\s*#+$/, '').trim() : undefined
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildMemoryIndex(): MemoryDoc[] {
  const docs: MemoryDoc[] = []

  // 1) 笔记：通过 Vite glob 以 raw 方式读取所有笔记 MD，手动解析 frontmatter + body。
  // 路径相对于 src/components/SearchProvider.ts -> ../../docs/notes/
  const noteModules = import.meta.glob<string>('../../docs/notes/**/*.md', { eager: true, as: 'raw' })
  for (const [path, raw] of Object.entries(noteModules)) {
    const fm = parseFrontmatter(raw)
    const slug = path.replace('../../docs/notes/', '').replace(/\.md$/, '')
    const url = '/notes/' + slug + '/'
    const title = fm.title || extractFirstHeading(fm.body) || cleanTitle(undefined, url)
    docs.push({
      url: normalizeUrl(url),
      title,
      text: [
        title,
        fm.description,
        (fm.tags || []).join(' '),
        stripMarkdown(fm.body),
      ]
        .filter(Boolean)
        .join(' '),
      type: '笔记',
    })
  }

  // 2) 片段
  for (const s of snippets as { id: string; title: string; tags: string[]; description: string; code: string }[]) {
    docs.push({
      url: normalizeUrl('/snippets/#' + s.id),
      title: s.title,
      text: [s.title, s.description, s.tags.join(' '), s.code].join(' '),
      type: '片段',
    })
  }

  // 3) 面试题
  for (const q of questions as { id: string; title: string; tags: string[]; question: string; hint: string; answer: string }[]) {
    docs.push({
      url: normalizeUrl('/questions/#' + q.id),
      title: q.title,
      text: [q.title, q.question, q.hint, q.answer, q.tags.join(' ')].join(' '),
      type: '面试题',
    })
  }

  // 4) 项目
  for (const p of projects as { slug: string; title: string; tags: string[]; summary: string }[]) {
    docs.push({
      url: normalizeUrl('/projects/' + p.slug + '/'),
      title: p.title,
      text: [p.title, p.summary, p.tags.join(' ')].join(' '),
      type: '项目',
    })
  }

  return docs
}

async function ensureMemoryIndex(): Promise<MemoryDoc[]> {
  if (memoryIndex) return memoryIndex
  memoryIndex = buildMemoryIndex()
  return memoryIndex
}

function highlight(text: string, q: string): string {
  const re = new RegExp(`(${escapeRegExp(q)})`, 'gi')
  return text.replace(re, '<mark>$1</mark>')
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function excerpt(text: string, q: string, limit = 120): string {
  const lower = text.toLowerCase()
  const idx = lower.indexOf(q.toLowerCase())
  const start = Math.max(0, idx === -1 ? 0 : idx - limit / 2)
  const raw = text.slice(start, start + limit * 2)
  const prefix = start > 0 ? '…' : ''
  const suffix = start + limit * 2 < text.length ? '…' : ''
  return prefix + highlight(raw, q) + suffix
}

async function searchPagefind(query: string, limit: number): Promise<SearchHit[]> {
  const pf = await getPagefind()
  if (!pf) return []
  const q = query.trim()
  if (!q) return []
  const res = await pf.search(q)
  const top = (res.results as { data: () => Promise<PagefindResult> }[]).slice(0, limit)
  const data = await Promise.all(top.map((r) => r.data()))
  return data.map((d) => ({
    url: d.url,
    title: cleanTitle(d.meta?.title as string | undefined, d.url),
    excerpt: d.excerpt,
    type: inferType(d.url),
  }))
}

async function searchMemory(query: string, limit: number): Promise<SearchHit[]> {
  const q = query.trim()
  if (!q) return []
  const docs = await ensureMemoryIndex()
  const terms = q.toLowerCase().split(/\s+/)
  const scored = docs
    .map((d) => {
      const text = (d.title + ' ' + d.text).toLowerCase()
      const matchedTerms = terms.filter((t) => text.includes(t)).length
      const titleHits = terms.filter((t) => d.title.toLowerCase().includes(t)).length
      return { doc: d, score: matchedTerms * 10 + titleHits * 5 }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored.map((x) => ({
    url: x.doc.url,
    title: x.doc.title,
    excerpt: excerpt(x.doc.text, q),
    type: x.doc.type,
  }))
}

export async function initSearch(): Promise<void> {
  const pf = await getPagefind()
  if (!pf) {
    await ensureMemoryIndex()
  }
}

function containsCJK(s: string): boolean {
  return /[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(s)
}

export async function search(query: string, limit = 8): Promise<SearchHit[]> {
  const q = query.trim()
  if (!q) return []

  // Pagefind 对 CJK 按字符分词并在字间插入零宽空格，导致连续中文词
  // （如"预处理"）匹配率极低。中文查询直接走内存索引，英文/数字仍用 Pagefind。
  if (containsCJK(q)) {
    await ensureMemoryIndex()
    return searchMemory(q, limit)
  }

  const pf = await getPagefind()
  if (pf) return searchPagefind(q, limit)
  await ensureMemoryIndex()
  return searchMemory(q, limit)
}
