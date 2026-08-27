<script setup lang="ts">
import { ref, computed } from 'vue'
import snippets from '../../docs/snippets/data/snippets.json'

interface Snippet {
  id: string
  title: string
  language: string
  tags: string[]
  description: string
  code: string
}

const query = ref('')
const activeLang = ref('')
const activeTags = ref<string[]>([])
const copiedId = ref('')

const languages = computed(() =>
  Array.from(new Set((snippets as Snippet[]).map((s) => s.language)))
)
const allTags = computed(() =>
  Array.from(new Set((snippets as Snippet[]).flatMap((s) => s.tags)))
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return (snippets as Snippet[]).filter((s) => {
    if (activeLang.value && s.language !== activeLang.value) return false
    if (activeTags.value.length && !activeTags.value.every((t) => s.tags.includes(t)))
      return false
    if (q) {
      const hay = (
        s.title +
        s.description +
        s.code +
        s.tags.join(' ')
      ).toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
})

function toggleTag(t: string) {
  const i = activeTags.value.indexOf(t)
  if (i >= 0) activeTags.value.splice(i, 1)
  else activeTags.value.push(t)
}

async function copy(code: string, id: string) {
  try {
    await navigator.clipboard.writeText(code)
    copiedId.value = id
    setTimeout(() => {
      if (copiedId.value === id) copiedId.value = ''
    }, 1500)
  } catch {
    /* 剪贴板不可用时静默降级 */
  }
}
</script>

<template>
  <div class="snippet-browser">
    <div class="kb-toolbar kb-glass">
      <input
        v-model="query"
        class="kb-input"
        type="search"
        placeholder="搜索片段：标题 / 描述 / 代码 / 标签"
      />
      <select v-model="activeLang" class="kb-select">
        <option value="">全部语言</option>
        <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
      </select>
    </div>

    <div class="kb-chips">
      <button
        v-for="t in allTags"
        :key="t"
        class="kb-chip"
        :class="{ active: activeTags.includes(t) }"
        @click="toggleTag(t)"
      >
        #{{ t }}
      </button>
    </div>

    <p class="kb-count">共 {{ filtered.length }} 个片段</p>

    <div class="kb-grid">
      <article
        v-for="s in filtered"
        :key="s.id"
        class="kb-card kb-glass"
        data-pagefind-body
      >
        <header class="kb-card-head">
          <h3>{{ s.title }}</h3>
          <span class="kb-lang">{{ s.language }}</span>
        </header>
        <p class="kb-desc">{{ s.description }}</p>
        <pre class="kb-code"><code>{{ s.code }}</code></pre>
        <footer class="kb-card-foot">
          <div class="kb-tags">
            <span v-for="t in s.tags" :key="t" class="kb-tag">#{{ t }}</span>
          </div>
          <button class="kb-copy" @click="copy(s.code, s.id)">
            {{ copiedId === s.id ? '✓ 已复制' : '复制' }}
          </button>
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
.snippet-browser {
  margin-top: 1rem;
}
.kb-toolbar {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--kb-radius);
  flex-wrap: wrap;
}
.kb-input {
  flex: 1 1 240px;
  min-width: 0;
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--kb-border);
  border-radius: var(--kb-radius-sm);
  background: var(--kb-surface-solid);
  color: var(--kb-text);
  font-size: 0.95rem;
  outline: none;
}
.kb-input:focus {
  border-color: var(--kb-primary);
  box-shadow: 0 0 0 3px var(--kb-primary-soft);
}
.kb-select {
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--kb-border);
  border-radius: var(--kb-radius-sm);
  background: var(--kb-surface-solid);
  color: var(--kb-text);
}
.kb-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0.5rem;
}
.kb-chip {
  border: 1px solid var(--kb-border);
  background: var(--kb-surface);
  color: var(--kb-text-soft);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s;
}
.kb-chip.active {
  background: var(--kb-primary);
  color: #fff;
  border-color: var(--kb-primary);
}
.kb-count {
  color: var(--kb-text-soft);
  font-size: 0.85rem;
  margin: 0.4rem 0 1rem;
}
.kb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}
.kb-card {
  padding: 1rem 1.1rem;
  border-radius: var(--kb-radius);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.kb-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.kb-card-head h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--kb-text);
}
.kb-lang {
  font-size: 0.72rem;
  color: var(--kb-primary);
  background: var(--kb-primary-soft);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  white-space: nowrap;
}
.kb-desc {
  margin: 0;
  color: var(--kb-text-soft);
  font-size: 0.88rem;
  line-height: 1.5;
}
.kb-code {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  padding: 0.8rem;
  border-radius: var(--kb-radius-sm);
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.5;
  max-height: 260px;
}
.kb-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
}
.kb-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.kb-tag {
  font-size: 0.72rem;
  color: var(--kb-text-soft);
}
.kb-copy {
  border: 1px solid var(--kb-border);
  background: var(--kb-surface-solid);
  color: var(--kb-primary);
  padding: 0.35rem 0.8rem;
  border-radius: var(--kb-radius-sm);
  cursor: pointer;
  font-size: 0.82rem;
  white-space: nowrap;
}
.kb-copy:hover {
  background: var(--kb-primary-soft);
}
</style>
