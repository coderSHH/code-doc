import DefaultTheme from 'vitepress/theme'
import './style.css'

import HomeView from '../../../src/components/HomeView.vue'
import HeroSearch from '../../../src/components/HeroSearch.vue'
import SearchResults from '../../../src/components/SearchResults.vue'
import SnippetBrowser from '../../../src/components/SnippetBrowser.vue'
import QuestionBank from '../../../src/components/QuestionBank.vue'
import ProjectList from '../../../src/components/ProjectList.vue'
import ProjectCard from '../../../src/components/ProjectCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeView', HomeView)
    app.component('HeroSearch', HeroSearch)
    app.component('SearchResults', SearchResults)
    app.component('SnippetBrowser', SnippetBrowser)
    app.component('QuestionBank', QuestionBank)
    app.component('ProjectList', ProjectList)
    app.component('ProjectCard', ProjectCard)
  },
}
