// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.prototype.$http = axios

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)


//引入vue图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
	preload: 1.3,//预加载的宽度
	error: './assets/timg.jpg',//加载失败图片的路径
	loading: './assets/loading.gif',//加载中图片的路径
	attempt: 3//尝试加载的次数
})

//引用默认样式
import '@/assets/stylus/reset.styl'
//引入矢量图标
import '@/assets/fonts/iconfont.css'

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {  // 判断该路由是否需要登录权限
  	if(localStorage.getItem('userId')){//通过本地存储获取当前的userId是否存在
  		next()
  	}else{
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
	}
  }else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
