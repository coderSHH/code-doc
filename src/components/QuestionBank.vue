<script setup lang="ts">
import { ref, computed } from 'vue'
import questions from '../../docs/questions/data/questions.json'

interface Question {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  question: string
  hint: string
  answer: string
  code: string
}

const query = ref('')
const activeDiff = ref('')
const activeTags = ref<string[]>([])
const selected = ref<Question | null>(null)

const diffLabel: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const allTags = computed(() =>
  Array.from(new Set((questions as Question[]).flatMap((q) => q.tags)))
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return (questions as Question[]).filter((item) => {
    if (activeDiff.value && item.difficulty !== activeDiff.value) return false
    if (activeTags.value.length && !activeTags.value.every((t) => item.tags.includes(t)))
      return false
    if (q) {
      const hay = (item.title + item.question + item.tags.join(' ')).toLowerCase()
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

function open(q: Question) {
  selected.value = q
}

function close() {
  selected.value = null
}
</script>

<template>
  <div class="qb">
    <div class="kb-toolbar kb-glass">
      <input
        v-model="query"
        class="kb-input"
        type="search"
        placeholder="搜索面试题：标题 / 题干 / 标签"
      />
      <select v-model="activeDiff" class="kb-select">
        <option value="">全部难度</option>
        <option value="easy">简单</option>
        <option value="medium">中等</option>
        <option value="hard">困难</option>
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

    <p class="kb-count">共 {{ filtered.length }} 道题</p>

    <div class="kb-grid">
      <button
        v-for="q in filtered"
        :key="q.id"
        class="qb-card kb-glass"
        data-pagefind-body
        @click="open(q)"
      >
        <span class="qb-diff" :class="q.difficulty">{{ diffLabel[q.difficulty] }}</span>
        <h3>{{ q.title }}</h3>
        <div class="kb-tags">
          <span v-for="t in q.tags" :key="t" class="kb-tag">#{{ t }}</span>
        </div>
      </button>
    </div>

    <!-- 抽屉 -->
    <Teleport to="body">
      <div v-if="selected" class="qb-mask" @click.self="close">
        <aside class="qb-drawer kb-glass" role="dialog" aria-modal="true">
          <header class="qb-drawer-head">
            <span class="qb-diff" :class="selected.difficulty">{{
              diffLabel[selected.difficulty]
            }}</span>
            <h2>{{ selected.title }}</h2>
            <button class="qb-close" @click="close" aria-label="关闭">×</button>
          </header>

          <div class="qb-drawer-body">
            <section class="qb-block">
              <h4>题干</h4>
              <p>{{ selected.question }}</p>
            </section>

            <section class="qb-block">
              <h4>提示</h4>
              <p class="qb-answer">{{ selected.hint }}</p>
            </section>

            <section class="qb-block">
              <h4>答案</h4>
              <p class="qb-answer">{{ selected.answer }}</p>
              <pre v-if="selected.code" class="kb-code"><code>{{ selected.code }}</code></pre>
            </section>

            <div class="kb-tags qb-foot-tags">
              <span v-for="t in selected.tags" :key="t" class="kb-tag">#{{ t }}</span>
            </div>
          </div>
        </aside>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.qb {
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.qb-card {
  text-align: left;
  padding: 1rem 1.1rem;
  border-radius: var(--kb-radius);
  border: 1px solid var(--kb-border);
  background: var(--kb-surface);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.15s, box-shadow 0.15s;
}
.qb-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--kb-shadow);
}
.qb-card h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--kb-text);
  line-height: 1.45;
}
.qb-diff {
  align-self: flex-start;
  font-size: 0.72rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  color: #fff;
}
.qb-diff.easy {
  background: #16a34a;
}
.qb-diff.medium {
  background: #f59e0b;
}
.qb-diff.hard {
  background: #dc2626;
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

/* 抽屉 */
.qb-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}
.qb-drawer {
  width: min(520px, 92vw);
  height: 100%;
  background: var(--kb-surface-solid);
  border-left: 1px solid var(--kb-border);
  box-shadow: -10px 0 40px rgba(23, 112, 252, 0.15);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.22s ease;
}
@keyframes slideIn {
  from {
    transform: translateX(40px);
    opacity: 0.4;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.qb-drawer-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.1rem 1.3rem;
  border-bottom: 1px solid var(--kb-border);
}
.qb-drawer-head h2 {
  margin: 0;
  flex: 1;
  font-size: 1.1rem;
  color: var(--kb-text);
}
.qb-close {
  border: none;
  background: transparent;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--kb-text-soft);
  cursor: pointer;
}
.qb-drawer-body {
  padding: 1.2rem 1.3rem;
  overflow-y: auto;
}
.qb-block {
  margin-bottom: 1.2rem;
}
.qb-block h4 {
  margin: 0 0 0.4rem;
  color: var(--kb-primary);
  font-size: 0.9rem;
}
.qb-block p {
  margin: 0;
  color: var(--kb-text);
  line-height: 1.6;
}
.qb-toggle {
  border: 1px solid var(--kb-border);
  background: var(--kb-surface);
  color: var(--kb-text);
  padding: 0.45rem 0.9rem;
  border-radius: var(--kb-radius-sm);
  cursor: pointer;
  font-size: 0.85rem;
}
.qb-toggle.primary {
  color: var(--kb-primary);
  border-color: var(--kb-primary);
}
.qb-answer {
  margin-top: 0.6rem !important;
  padding: 0.8rem;
  background: var(--kb-primary-soft);
  border-radius: var(--kb-radius-sm);
}
.kb-code {
  margin: 0.6rem 0 0;
  background: #0f172a;
  color: #e2e8f0;
  padding: 0.8rem;
  border-radius: var(--kb-radius-sm);
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.5;
}
.qb-foot-tags {
  margin-top: 0.4rem;
}
</style>
