<script setup lang="ts">
import projects from '../../docs/projects/_data/projects.json'
import ProjectCard from './ProjectCard.vue'

interface Project {
  slug: string
  title: string
  tags: string[]
  cover: string
  repo: string
  summary: string
  date: string
}
</script>

<template>
  <div class="pl">
    <p class="kb-count">共 {{ (projects as Project[]).length }} 个项目</p>
    <div class="pl-grid">
      <ProjectCard
        v-for="p in (projects as Project[])"
        :key="p.slug"
        :project="p"
      />
    </div>
  </div>
</template>

<style scoped>
.pl {
  margin-top: 1rem;
}
.kb-count {
  color: var(--kb-text-soft);
  font-size: 0.85rem;
  margin: 0 0 1rem;
}
.pl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
}
</style>
