const tests = ['nature', 'animals', 'food', 'clothes'];

import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Error404 from '../views/Error404'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
	},
	{
    path: '/:name',
		name: 'test',
		props: true,
		component: Test,
		beforeEnter: (to, from, next) => {
			tests.some(test => test === to.params.name) ? next() : next({ name: '404' })
		}
	},
	{
		path: '/404',
		alias: '*',
		name: '404',
		component: Error404
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
