// ingest-notes.mjs —— 从 DOC 源目录批量导入 Markdown 笔记到知识库 docs/notes/<板块>/<分类>/
//
// 设计要点：
//  - DOC 顶层子目录 -> 知识库分类由 MAP 决定；未映射目录默认落到 frontend/<slug> 并告警（不丢文件）。
//  - 每个 .md 自动补齐 frontmatter（title/date/category/tags/description）并加 # 标题，正文原样保留。
//  - 文件名做安全化（中文保留，空格/括号/下划线 -> -），保证 Markdown 链接与 URL 不炸。
//  - 幂等：目标文件已存在则跳过（除非 --force）；自动生成/补全各级 index.md。
//
// 用法：
//   node scripts/ingest-notes.mjs                # 默认源 = 仓库上一级的 DOC 目录
//   node scripts/ingest-notes.mjs --src <dir>    # 指定源目录
//   node scripts/ingest-notes.mjs --force        # 覆盖已存在的笔记
//   node scripts/ingest-notes.mjs --dry          # 只打印计划，不落盘

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')                       // knowledge-base
const NOTES_DEST = path.resolve(ROOT, 'docs', 'notes')

const args = process.argv.slice(2)
const DRY = args.includes('--dry')
const FORCE = args.includes('--force')
const srcIdx = args.indexOf('--src')
const DOC_SRC = srcIdx !== -1
  ? path.resolve(args[srcIdx + 1])
  : path.resolve(ROOT, '..', 'DOC')                              // /Users/shanshan/Documents/My/CodeDesk/DOC

// DOC 顶层子目录 -> 知识库分类映射（板块 / 分类路径 / 中文展示名）
// 后续新增目录（如 backend、tools）在这里登记即可；未登记的走 frontend/<slug> 兜底。
const MAP = {
  CSS: { board: 'frontend', cat: 'html-css/css', name: 'CSS' },
  HTML: { board: 'frontend', cat: 'html-css/html', name: 'HTML' },
}

const today = new Date().toISOString().slice(0, 10)

// ---------- 工具函数 ----------
function fileSlug(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[()（）]/g, '-')
    .replace(/_/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function cleanTitle(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/_/g, ' ')
    .replace(/\(/g, '（')
    .replace(/\)/g, '）')
    .trim()
}

function deriveDescription(body) {
  const firstLine = (body.split('\n').find((l) => l.trim().length > 0) || '').trim()
  const text = firstLine
    .replace(/^#{1,6}\s*/, '')
    .replace(/[`*_]/g, '')
    .trim()
  return text.length > 100 ? text.slice(0, 100) + '…' : text || '工作笔记收录。'
}

function humanize(slug) {
  return slug.replace(/-+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// 净化正文：VitePress 把 .md 当 Vue 模板编译，裸写的 <tag>（未进代码围栏/反引号）会被当成
// 真实 HTML 标签导致编译失败。这里把非代码围栏区域内的 < > 转义为实体，保证显示为字面量。
// 代码围栏（``` / ~~~）内不动——markdown-it 已自行转义，双重转义会出错。
function escapeRawHtml(body) {
  const lines = body.split('\n')
  let inFence = false
  let fence = ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fm = line.match(/^\s*(```|~~~)/)
    if (fm) {
      if (!inFence) {
        inFence = true
        fence = fm[1]
      } else if (line.trim().startsWith(fence)) {
        inFence = false
        fence = ''
      }
      continue
    }
    if (!inFence) {
      lines[i] = line.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
  }
  return lines.join('\n')
}

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p, cb)
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) cb(p)
  }
}

// ---------- 主流程 ----------
function main() {
  if (!fs.existsSync(DOC_SRC)) {
    console.error(`[ERR] 源目录不存在: ${DOC_SRC}`)
    process.exit(1)
  }

  const stats = { ingested: 0, skipped: 0, warnings: [] }
  // 记录每个被触碰过的目标目录，用于刷新 index.md（无论笔记是本次写入还是已存在）。
  const touchedDirs = new Set()

  for (const top of fs.readdirSync(DOC_SRC, { withFileTypes: true })) {
    if (!top.isDirectory()) continue
    const dirKey = top.name
    let route
    if (MAP[dirKey]) {
      const m = MAP[dirKey]
      route = { board: m.board, cat: m.cat, name: m.name }
    } else {
      const slug = fileSlug(dirKey)
      route = { board: 'frontend', cat: slug, name: humanize(slug) }
      stats.warnings.push(`未映射目录 "${dirKey}"，兜底到 frontend/${slug}`)
    }

    const topDir = path.join(DOC_SRC, dirKey)
    walk(topDir, (filePath) => {
      const rel = path.relative(topDir, filePath)            // 可能为 "a/b.md"
      const relDir = path.dirname(rel)
      const baseName = path.basename(filePath, '.md')

      const targetDir = path.join(NOTES_DEST, route.board, route.cat, relDir)
      const slug = fileSlug(baseName)
      const targetFile = path.join(targetDir, slug + '.md')

      if (fs.existsSync(targetFile) && !FORCE) {
        stats.skipped++
        if (DRY) console.log(`  [skip]  已存在: ${path.relative(ROOT, targetFile)}`)
        touchedDirs.add(targetDir)
        return
      }

      const raw = fs.readFileSync(filePath, 'utf8')
      const body = escapeRawHtml(raw)
      const title = cleanTitle(baseName)
      const description = deriveDescription(body)
      const tags = [route.name.toLowerCase(), route.board]

      const fm = [
        '---',
        `title: ${title}`,
        `date: ${today}`,
        `category: ${route.board}`,
        `tags: [${tags.join(', ')}]`,
        `description: ${description}`,
        '---',
        '',
        `# ${title}`,
        '',
        body.replace(/^\uFEFF/, '').replace(/\s+$/, '') + '\n',
      ].join('\n')

      if (DRY) {
        console.log(`  [write]  ${path.relative(ROOT, targetFile)}  (${title})`)
      } else {
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(targetFile, fm, 'utf8')
      }

      stats.ingested++
      touchedDirs.add(targetDir)
    })
  }

  // ---------- 生成 / 补全 index.md ----------
  // 分类落地页由目录内笔记派生：扫描目录下所有 .md（排除 index.md），
  // 保留已有 frontmatter（含 curated 元数据），仅重建正文链接列表。
  function genLeafIndex(dir) {
    const idxFile = path.join(dir, 'index.md')
    let fmBlock = '---\n'
    let title = humanize(path.basename(dir))
    if (fs.existsSync(idxFile)) {
      const existing = fs.readFileSync(idxFile, 'utf8')
      const m = existing.match(/^---\n([\s\S]*?)\n---\n?/)
      if (m) {
        fmBlock = m[0].replace(/\n$/, '')
        const tm = m[1].match(/title:\s*(.+)/)
        if (tm) title = tm[1].trim()
      }
    }

    const notes = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isFile() &&
          e.name.toLowerCase().endsWith('.md') &&
          e.name.toLowerCase() !== 'index.md'
      )
      .map((e) => {
        const c = fs.readFileSync(path.join(dir, e.name), 'utf8')
        const tm = c.match(/^---\n[\s\S]*?title:\s*(.+?)\n/)
        return {
          slug: path.basename(e.name, '.md'),
          title: tm ? tm[1].trim() : humanize(path.basename(e.name, '.md')),
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title, 'zh'))

    const lines = [
      fmBlock,
      '',
      `# ${title}`,
      '',
      notes.length ? `本分类下共 ${notes.length} 篇笔记：` : '（暂无笔记）',
      '',
    ]
    for (const n of notes) lines.push(`- [${n.title}](./${n.slug})`)
    if (!DRY) fs.writeFileSync(idxFile, lines.join('\n') + '\n', 'utf8')
  }

  function genParentIndex(dir) {
    const idxFile = path.join(dir, 'index.md')
    if (fs.existsSync(idxFile)) return
    const subs = fs.readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, 'zh'))
    if (subs.length === 0) return
    const title = humanize(path.basename(dir))
    const lines = [`# ${title}`, '', '子分类：', '']
    for (const s of subs) lines.push(`- [${humanize(s)}](./${s}/)`)
    if (!DRY) fs.writeFileSync(idxFile, lines.join('\n') + '\n', 'utf8')
  }

  for (const dir of touchedDirs) {
    genLeafIndex(dir)
    // 向上补全父级 index，直到 NOTES_DEST 或已有 index
    let cur = path.dirname(dir)
    while (cur !== NOTES_DEST && path.dirname(cur) !== cur) {
      if (!fs.existsSync(path.join(cur, 'index.md'))) genParentIndex(cur)
      cur = path.dirname(cur)
    }
  }

  // ---------- 报告 ----------
  console.log('\n========== ingest 报告 ==========')
  console.log(`源目录 : ${DOC_SRC}`)
  console.log(`目标根 : ${NOTES_DEST}`)
  console.log(`新增笔记 : ${stats.ingested}`)
  console.log(`跳过(已存在) : ${stats.skipped}`)
  console.log(`模式 : ${DRY ? 'DRY-RUN(未落盘)' : FORCE ? 'FORCE(覆盖)' : '普通(跳过已存在)'}`)
  if (stats.warnings.length) {
    console.log('\n警告:')
    for (const w of stats.warnings) console.log(`  - ${w}`)
  }
  console.log('================================')
}

main()
