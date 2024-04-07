import { createMemoryHistory, createRouter } from 'vue-router'

import Chat from './sections/chat/Chat.vue'

const routes = [
  { path: '/', redirect: '/chat' },
  { path: '/chat', component: Chat },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})