<script setup lang="ts">
import { withBase } from 'vitepress'

interface Project {
  slug: string
  title: string
  tags: string[]
  cover: string
  repo: string
  summary: string
  date: string
}

defineProps<{ project: Project }>()
</script>

<template>
  <a :href="withBase(`/projects/${project.slug}/`)" class="pc kb-glass" data-pagefind-body>
    <div class="pc-cover">
      <span v-if="!project.cover" class="pc-cover-ph">{{ project.title.slice(0, 1) }}</span>
      <img v-else :src="project.cover" :alt="project.title" />
    </div>
    <div class="pc-body">
      <h3>{{ project.title }}</h3>
      <p>{{ project.summary }}</p>
      <div class="kb-tags">
        <span v-for="t in project.tags" :key="t" class="kb-tag">#{{ t }}</span>
      </div>
    </div>
    <footer class="pc-foot">
      <span class="pc-date">{{ project.date }}</span>
      <span class="pc-go">查看详情 →</span>
    </footer>
  </a>
</template>

<style scoped>
.pc {
  display: flex;
  flex-direction: column;
  border-radius: var(--kb-radius);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s, box-shadow 0.15s;
}
.pc:hover {
  transform: translateY(-4px);
  box-shadow: var(--kb-shadow);
}
.pc-cover {
  height: 120px;
  background: linear-gradient(135deg, var(--kb-primary), var(--kb-primary-3));
  display: flex;
  align-items: center;
  justify-content: center;
}
.pc-cover-ph {
  font-size: 2.6rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}
.pc-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pc-body {
  padding: 1rem 1.1rem 0.5rem;
  flex: 1;
}
.pc-body h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  color: var(--kb-text);
}
.pc-body p {
  margin: 0 0 0.7rem;
  color: var(--kb-text-soft);
  font-size: 0.88rem;
  line-height: 1.5;
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
.pc-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--kb-border);
  font-size: 0.8rem;
}
.pc-date {
  color: var(--kb-text-soft);
}
.pc-go {
  color: var(--kb-primary);
  font-weight: 600;
}
</style>
