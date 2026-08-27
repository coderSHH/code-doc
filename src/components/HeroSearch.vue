<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vitepress'
import { search, initSearch, isSearchAvailable, type SearchHit } from './SearchProvider'

const router = useRouter()
const query = ref('')
const hits = ref<SearchHit[]>([])
const open = ref(false)
const loading = ref(false)
const available = ref(true)
let timer: number | undefined

const typeClass: Record<SearchHit['type'], string> = {
  笔记: 't-note',
  片段: 't-snippet',
  项目: 't-project',
  面试题: 't-question',
  页面: 't-page',
}

async function run() {
  const q = query.value.trim()
  if (!q) {
    hits.value = []
    return
  }
  loading.value = true
  try {
    hits.value = await search(q, 8)
  } finally {
    loading.value = false
  }
}

function onInput() {
  open.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(run, 150)
}

function onSubmit() {
  const q = query.value.trim()
  if (!q) return
  open.value = false
  router.go(`/search?q=${encodeURIComponent(q)}`)
}

function go(hit: SearchHit) {
  open.value = false
  router.go(hit.url)
}

function onBlur() {
  // 延迟关闭，保证点击结果项能先触发
  window.setTimeout(() => (open.value = false), 160)
}

onMounted(async () => {
  // 初始化检索：优先 Pagefind，不可用则构建内存索引
  await initSearch()
  available.value = isSearchAvailable()
})

onBeforeUnmount(() => window.clearTimeout(timer))

watch(query, (v) => {
  if (!v.trim()) hits.value = []
})
</script>

<template>
  <div class="hero-search" @focusin="open = true" @focusout="onBlur">
    <form class="hs-box kb-glass" @submit.prevent="onSubmit">
      <svg class="hs-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          d="M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
        />
      </svg>
      <input
        v-model="query"
        class="hs-input"
        type="search"
        autocomplete="off"
        placeholder="搜索笔记 / 片段 / 项目 / 面试题…"
        @input="onInput"
        @focus="open = true"
      />
      <button class="hs-go" type="submit">检索</button>
    </form>

    <p v-if="!available" class="hs-hint">
      当前无 Pagefind 索引（dev 模式或本地 file 协议打开）。<br />
      正确预览请运行 <code>pnpm build &amp;&amp; pnpm preview</code>，然后访问 <code>http://localhost:4173</code>。
    </p>

    <div v-if="open && available && query.trim()" class="hs-dropdown kb-glass">
      <p v-if="loading" class="hs-status">检索中…</p>
      <p v-else-if="!hits.length" class="hs-status">没有匹配结果</p>
      <ul v-else class="hs-list">
        <li v-for="h in hits" :key="h.url" @mousedown.prevent="go(h)">
          <span class="hs-type" :class="typeClass[h.type]">{{ h.type }}</span>
          <div class="hs-item-main">
            <div class="hs-title">{{ h.title }}</div>
            <div class="hs-excerpt" v-html="h.excerpt"></div>
            <div class="hs-url">{{ h.url }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.hero-search {
  position: relative;
  width: min(720px, 100%);
  margin: 0 auto;
}
.hs-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem 0.5rem 1rem;
  border-radius: 999px;
  box-shadow: 0 12px 40px rgba(23, 112, 252, 0.18);
}
.hero-search:focus-within .hs-box {
  box-shadow: 0 0 0 4px var(--kb-primary-soft), 0 12px 40px rgba(23, 112, 252, 0.25);
}
.hs-icon {
  color: var(--kb-primary);
  flex-shrink: 0;
}
.hs-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.05rem;
  color: var(--kb-text);
}
.hs-input::placeholder {
  color: var(--kb-text-soft);
}
.hs-go {
  border: none;
  background: var(--kb-primary);
  color: #fff;
  padding: 0.55rem 1.3rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  flex-shrink: 0;
}
.hs-go:hover {
  filter: brightness(1.05);
}
.hs-hint {
  margin: 0.7rem 0 0;
  font-size: 0.82rem;
  color: var(--kb-text-soft);
  text-align: center;
}
.hs-hint code {
  background: var(--kb-primary-soft);
  color: var(--kb-primary);
  padding: 0.1rem 0.4rem;
  border-radius: 6px;
}
.hs-dropdown {
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  right: 0;
  max-height: 60vh;
  overflow-y: auto;
  border-radius: var(--kb-radius);
  padding: 0.4rem;
  z-index: 50;
  box-shadow: var(--kb-shadow);
}
.hs-status {
  margin: 0;
  padding: 1rem;
  text-align: center;
  color: var(--kb-text-soft);
  font-size: 0.9rem;
}
.hs-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.hs-list li {
  display: flex;
  gap: 0.7rem;
  padding: 0.7rem 0.8rem;
  border-radius: var(--kb-radius-sm);
  cursor: pointer;
}
.hs-list li:hover {
  background: var(--kb-primary-soft);
}
.hs-type {
  flex-shrink: 0;
  align-self: flex-start;
  font-size: 0.68rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  color: #fff;
  margin-top: 0.15rem;
}
.t-note {
  background: #1770fc;
}
.t-snippet {
  background: #0ea5e9;
}
.t-project {
  background: #8b5cf6;
}
.t-question {
  background: #f59e0b;
}
.t-page {
  background: #64748b;
}
.hs-item-main {
  min-width: 0;
}
.hs-title {
  font-weight: 600;
  color: var(--kb-text);
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}
.hs-excerpt {
  font-size: 0.82rem;
  color: var(--kb-text-soft);
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.hs-excerpt :deep(mark) {
  background: rgba(23, 112, 252, 0.22);
  color: var(--kb-primary);
  border-radius: 3px;
  padding: 0 2px;
}
.hs-url {
  font-size: 0.72rem;
  color: var(--kb-text-soft);
  margin-top: 0.2rem;
  opacity: 0.7;
}
</style>
