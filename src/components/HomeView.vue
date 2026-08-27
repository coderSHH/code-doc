<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import HeroSearch from './HeroSearch.vue'

const isFileProtocol = ref(false)

onMounted(() => {
  isFileProtocol.value = typeof window !== 'undefined' && window.location.protocol === 'file:'
})

const modules = [
  { title: '知识笔记', desc: '多年积累的 Markdown 文档，按分类组织，全站可搜。', link: '/notes/', icon: '📘' },
  { title: '代码片段', desc: '带语言/标签的结构化片段，一键复制、语法高亮。', link: '/snippets/', icon: '🧩' },
  { title: '项目展示', desc: '贴图 + 说明 + git 地址，沉淀你做过的项目。', link: '/projects/', icon: '🚀' },
  { title: '面试题库', desc: '一卡片一题，难度/标签筛选，抽屉看答案。', link: '/questions/', icon: '💡' },
]

const tags = ['Vue', 'React', 'Spring', 'TypeScript', 'MySQL', 'Redis', 'Docker', '算法']
</script>

<template>
  <div class="home">
    <div v-if="isFileProtocol" class="home-warning">
      ⚠️ 检测到通过 <code>file://</code> 协议直接打开文件。VitePress 是单页应用，菜单与搜索可能失效。<br />
      请运行 <code>pnpm build && pnpm preview</code> 后通过 <code>http://localhost:4173</code> 访问。
    </div>

    <section class="home-hero">
      <h1 class="home-title">执码者 <span>工作知识库</span></h1>
      <p class="home-tagline">知识点 · 面试题 · 项目实战 · 源码分析 —— 检索优先，查得准、查得快</p>
      <p class="home-tagline" style=" margin-top: 0">把知识系统化，持续沉淀，持续成长</p>


      <HeroSearch />

      <div class="home-tags">
        <span v-for="t in tags" :key="t" class="home-tag">{{ t }}</span>
      </div>
    </section>

    <section class="home-modules">
      <a v-for="m in modules" :key="m.link" :href="withBase(m.link)" class="home-card kb-glass">
        <span class="home-card-icon">{{ m.icon }}</span>
        <h3>{{ m.title }}</h3>
        <p>{{ m.desc }}</p>
        <span class="home-card-go">进入 →</span>
      </a>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding: 2.5rem 1rem 3rem;
  max-width: 1080px;
  margin: 0 auto;
}

.home-hero {
  text-align: center;
  padding: 2rem 0 1rem;
}

.home-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  margin: 0 0 0.6rem;
  color: var(--kb-text);
  font-weight: 800;
  letter-spacing: 0.5px;
}

.home-title span {
  color: var(--kb-primary);
}

.home-tagline {
  color: var(--kb-text-soft);
  font-size: 1.05rem;
  margin: 3rem 0 1rem 0;
}

.home-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.4rem;
}

.home-tag {
  font-size: 0.82rem;
  color: var(--kb-text-soft);
  border: 1px solid var(--kb-border);
  background: var(--kb-surface);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
}

.home-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin-top: 3rem;
}

.home-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem 1.3rem;
  border-radius: var(--kb-radius);
  text-decoration: none;
  color: var(--kb-text);
  transition: transform 0.18s, box-shadow 0.18s;
}

.home-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--kb-shadow);
}

.home-card-icon {
  font-size: 1.8rem;
}

.home-card h3 {
  margin: 0.3rem 0 0;
  font-size: 1.15rem;
  color: var(--kb-text);
}

.home-card p {
  margin: 0;
  color: var(--kb-text-soft);
  font-size: 0.88rem;
  line-height: 1.55;
  flex: 1;
}

.home-card-go {
  color: var(--kb-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.home-warning {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
  padding: 0.9rem 1.1rem;
  border-radius: var(--kb-radius);
  margin-bottom: 1rem;
  font-size: 0.88rem;
  line-height: 1.6;
}

.home-warning code {
  background: rgba(245, 158, 11, 0.18);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.85em;
}
</style>
