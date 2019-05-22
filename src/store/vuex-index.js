import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	//共享的数据或者传递过来的数据
	state:{
  		n: 'vuex',
  		m: 100,
  		shopList:[
  			{
  				id: 1,
  				count: 1,
  				name: '钢笔'
  			},{
  				id: 2,
  				count: 2,
  				name: '笔'
  			}
  		]
  	},
  	//计算属性
  	getters:{
  		total(state){
  			return state.shopList.reduce((n,item) => {
  				return item.count + n
  			},0)
  		}
  	},
  	//更改 Vuex 的 store 中的state的唯一方法
  	mutations:{
  		changeM(state,num){
  			state.m += num.num
  		},
  		adds(state,id){
  			let s = state.shopList.filter((item) => {
  				return item.id == id
  			})
  			s[0].count += 1;
  		},
  		lessa(state,id){
  			let s1 = state.shopList.filter((item) => {
  				return item.id == id
  			})
  			if(s1[0].count == 0){
				s1[0].count = 0;  				
  			}else{
  				s1[0].count--;
  			}
  		}
  	},
  	//异步操作
  	actions:{
  		changeMu(state,payload){
  			state.commit('adds',payload)
  		},
  		lessMu(state,payload){
  			state.commit('lessa',payload)
  		}
  	}
})

export default store