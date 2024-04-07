import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/sections/home/Home.vue';

import Chat from '@/sections/chat/Chat.vue';
import Dialog from '@/sections/chat/Dialog.vue';

import Users from '@/sections/users/Users.vue';
import UserPage from '@/sections/users/UserPage.vue';

import NotFound from '@/sections/NotFoundPage.vue';

console.log(Dialog);

const routes = [
  
  { path: '/', component: Home, name: 'home' },
  { path: '/messanger', component: Chat, name: 'messanger' },
  { path: '/dialog', component: Dialog, name: 'dialog' },
  { path: '/users', component: Users, name: 'users', children: [
    { path: '/:id', component: UserPage, name: 'user-page' },
  ]},

  { path: "/:pathMatch(.*)*", component: NotFound, name: '404' }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})