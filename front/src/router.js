import { createMemoryHistory, createRouter } from 'vue-router'

import Chat from './sections/chat/Chat.vue'

const routes = [
  { path: '/', redirect: '/chat', name: 'home' },
  { path: '/chat', component: Chat, name: 'chat' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})