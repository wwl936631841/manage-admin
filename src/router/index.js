import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');

import processManagement from "../page/processManagement/processManagement.vue"
import processDetail from "../page/processManagement/processDetail.vue"

const routes = [
	{
		path: '/',
		component: login,
		redirect: '/processManagement',
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '/processManagement',
			component: () => import(/* webpackChunkName: "processManagement" */  '@/page/processManagement/processManagement'),
			name: 'processManagement',
		},{
			path: '/processDetail',
			component: () => import(/* webpackChunkName: "processManagement" */  '@/page/processManagement/processDetail'),
			name: 'processDetail',
		}
		// ,{
		// 	path: '/addGoods',
		// 	component: addGoods,
		// 	meta: ['添加数据', '添加商品'],
		// },{
		// 	path: '/userList',
		// 	component: userList,
		// 	meta: ['数据管理', '用户列表'],
		// },{
		]
	}
]

export default new Router({
	// mode: 'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
