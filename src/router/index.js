import Vue from 'vue'
import Router from 'vue-router'
import AddData from '@/components/AddData'
import Logs from '@/components/Logs'
import Data from '@/components/Data'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'menu__item_active',
	routes: [
		{
			path: '/',
			name: 'addData',
			component: AddData
		},
		{
			path: '/logs',
			name: 'logs',
			component: Logs
		},
		{
			path: '/data',
			name: 'datas',
			component: Data
		}
	]
})
