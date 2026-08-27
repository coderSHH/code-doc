<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { search, initSearch, isSearchAvailable, type SearchHit } from './SearchProvider'

const route = useRoute()
const router = useRouter()

const query = ref('')
const hits = ref<SearchHit[]>([])
const loading = ref(false)
const available = ref(true)
const initialized = ref(false)

const typeClass: Record<SearchHit['type'], string> = {
  笔记: 't-note',
  片段: 't-snippet',
  项目: 't-project',
  面试题: 't-question',
  页面: 't-page',
}

async function run(q: string) {
  query.value = q
  if (!q.trim()) {
    hits.value = []
    return
  }
  loading.value = true
  try {
    hits.value = await search(q, 50)
  } finally {
    loading.value = false
  }
}

function go(hit: SearchHit) {
  router.go(hit.url)
}

onMounted(async () => {
  await initSearch()
  available.value = isSearchAvailable()
  initialized.value = true
  await run((route.query.q as string) || '')
})

watch(
  () => route.query.q,
  (q) => run((q as string) || '')
)
</script>

<template>
  <div class="search-results">
    <div v-if="!initialized" class="sr-status">加载中…</div>
    <div v-else-if="!available" class="sr-status">
      <p>检索索引尚未生成。</p>
      <p>请运行 <code>pnpm build &amp;&amp; pnpm preview</code> 后查看完整检索。</p>
    </div>
    <template v-else>
      <p v-if="query" class="sr-head">
        关于 <strong>“{{ query }}”</strong> 共 {{ hits.length }} 条结果
      </p>
      <p v-if="loading" class="sr-status">检索中…</p>
      <p v-else-if="!hits.length" class="sr-status">没有匹配结果，换个关键词试试。</p>
      <ul v-else class="sr-list">
        <li v-for="h in hits" :key="h.url" @click="go(h)">
          <span class="sr-type" :class="typeClass[h.type]">{{ h.type }}</span>
          <div class="sr-main">
            <div class="sr-title">{{ h.title }}</div>
            <div class="sr-excerpt" v-html="h.excerpt"></div>
            <div class="sr-url">{{ h.url }}</div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.search-results {
  margin-top: 1rem;
}
.sr-status {
  color: var(--kb-text-soft);
  padding: 1.5rem 0;
  line-height: 1.7;
}
.sr-status code {
  background: var(--kb-primary-soft);
  color: var(--kb-primary);
  padding: 0.1rem 0.4rem;
  border-radius: 6px;
}
.sr-head {
  color: var(--kb-text);
  font-size: 1.05rem;
  margin: 0 0 1rem;
}
.sr-head strong {
  color: var(--kb-primary);
}
.sr-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.sr-list li {
  display: flex;
  gap: 0.8rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--kb-border);
  border-radius: var(--kb-radius);
  background: var(--kb-surface);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.sr-list li:hover {
  border-color: var(--kb-primary);
  box-shadow: var(--kb-shadow);
}
.sr-type {
  flex-shrink: 0;
  align-self: flex-start;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  color: #fff;
  margin-top: 0.1rem;
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
.sr-main {
  min-width: 0;
}
.sr-title {
  font-weight: 600;
  color: var(--kb-text);
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
.sr-excerpt {
  font-size: 0.88rem;
  color: var(--kb-text-soft);
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.sr-excerpt :deep(mark) {
  background: rgba(23, 112, 252, 0.22);
  color: var(--kb-primary);
  border-radius: 3px;
  padding: 0 2px;
}
.sr-url {
  font-size: 0.74rem;
  color: var(--kb-text-soft);
  margin-top: 0.3rem;
  opacity: 0.7;
}
</style>
