import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/sections/home/Home.vue';
import PersonalCabinet from '@/sections/home/PersonalCabinet.vue';
import SignIn from '@/sections/home/Auth/SignIn.vue';
import SignUp from '@/sections/home/Auth/SignUp.vue';

import Chat from '@/sections/chat/Chat.vue';
import Dialog from '@/sections/chat/Dialog.vue';

import Users from '@/sections/users/Users.vue';
import UserPage from '@/sections/users/UserPage.vue';

import NotFound from '@/sections/NotFoundPage.vue';

const routes = [
  
  { path: '/', component: Home, name: 'home' },
  { path: '/sign-in', component: SignIn, name: 'sing-in' },
  { path: '/sign-up', component: SignUp, name: 'sign-up' },

  { path: '/personal', component: PersonalCabinet, name: 'personal' },
  { path: '/messanger', component: Chat, name: 'messanger' },
  { path: '/dialog', component: Dialog, name: 'dialog' },
  { path: '/users', component: Users, name: 'users'},
  { path: '/users/:id', component: UserPage, name: 'user-page' },

  { path: "/:pathMatch(.*)*", component: NotFound, name: '404' }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})