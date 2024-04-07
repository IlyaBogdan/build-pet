import { createMemoryHistory, createRouter } from 'vue-router'

import Chat from '@/sections/chat/Chat.vue';
import Dialog from '@/sections/chat/Dialog.vue';

import Users from '@/sections/users/Users.vue';
import UserPage from '@/sections/users/UserPage.vue';

const routes = [
  { path: '/', redirect: {name: 'messanger'}, name: 'home' },
  { path: '/messanger', component: Chat, name: 'messanger' },
  { path: '/dialog', component: Dialog, name: 'dialog' },

  { path: '/users', component: Users, name: 'users' },
  { path: '/users/:id', component: UserPage, name: 'user-page' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})