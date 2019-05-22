
//头部路由
let pages = [
	{//登录
    	path: '/',
      	name: 'login',
      	component: resolve=>require(['@/pages/login/login'],resolve)
	},{//注册
    	path:'/register',
    	name:'register',
    	component:resolve=>require(['@/pages/register/register'],resolve)
   	},{
   		path: '/v1',
   		name: 'v1',
   		component: resolve => require(['@/views/vuex/1'],resolve)
   	},{
   		path: '/v2',
   		name: 'v2',
   		component: resolve => require(['@/views/vuex/2'],resolve)
   	},{
   		path: '/v3',
   		name: 'v3',
   		component: resolve => require(['@/views/vuex/3'],resolve)
   	},{
		path: '/transmit',
		name: 'transmit',
		component: resolve => require(['@/components/common/transmit'],resolve)
	}
]
export default pages

