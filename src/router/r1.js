
import pages from './r2.js';
const routes = [
	{
   		path: '/main',
   		name: 'main',
   		component: resolve => require(['@/views/main'],resolve),
   		redirect: '/main/recommend',
   		children:[
   			{//推荐页
		   		path:'recommend',
		    	name:'recommend',
		    	meta:{
		   			auth: true//路由拦截
		   		},
		    	component:resolve=>require(['@/views/recommend/recommend'],resolve)
		   	},{//歌手页
		   		path:'singer',
		    	name:'singer',
		    	meta:{
		   			auth: true//路由拦截
		   		},
		    	component:resolve=>require(['@/views/singer/singer'],resolve)
		   	},{//排行页
		   		path:'ranking',
		   		name:'ranking',
		   		meta:{
		   			auth: true//路由拦截
		   		},
		   		component:resolve=>require(['@/views/ranking/ranking'],resolve)
		   	},{//搜索页
		   		path:'search',
		   		name:'search',
		   		component:resolve=>require(['@/views/search/search'],resolve)
		   	}
   		]
   	},
   	...pages
]
export default routes
