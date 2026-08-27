// 在 vitepress build 之后、pagefind 之前运行：
// 给所有正文容器 .vp-doc 注入 data-pagefind-body，
// 使 Pagefind 只索引正文（排除 nav/sidebar/footer 噪声）。
// 集合页卡片本身已带 data-pagefind-body，按卡片切分碎片级结果。
// 注意：Pagefind 一旦发现任意 data-pagefind-body，便只索引带该标记的元素，
// 故必须给笔记正文也打标，否则笔记会被整体排除。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../docs/.vitepress/dist'
)

if (!fs.existsSync(dist)) {
  console.error('[tag-pagefind] dist 不存在:', dist)
  process.exit(1)
}

let count = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.html')) {
      let html = fs.readFileSync(p, 'utf-8')
      const before = (html.match(/data-pagefind-body/g) || []).length
      html = html.replace(
        /class="(vp-doc[^"]*)"/g,
        'class="$1" data-pagefind-body'
      )
      const after = (html.match(/data-pagefind-body/g) || []).length
      if (after > before) {
        fs.writeFileSync(p, html)
        count++
      }
    }
  }
}

walk(dist)
console.log(`[tag-pagefind] 已为 ${count} 个页面正文打标 data-pagefind-body`)
