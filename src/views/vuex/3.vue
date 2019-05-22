<template>
	<div id="box">
		{{x}}
		<p><button @click='changeX()'>改变</button></p>
		<div v-for='item,index in list' :key='index'>
			<button @click='less(item.id)'>-</button>{{item.count}}<button @click='add(item.id)'>+</button>
		</div>
		<div>总价格：{{total}}</div>
	</div>
</template>
<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default{
		data(){
			return {
//				x: this.$store.state.m
//				num: 10
				shopList:{
					num: 10,
					price: 100
				}
			}
		},
		computed:{
			...mapGetters(['total']),
			x(){
				return this.$store.state.m
			},
			list(){
				return this.$store.state.shopList
			}
//			total(){
//				return this.list.reduce((n,item) => {
//					return item.count + n
//				},0)
//				return this.$store.getters.total
//			}
		},
		methods:{
			//数组的方式
//			...mapMutations([
//				'adds',
//				'lessa',
//				'changeM'
//			]),
			//对象的方式
			...mapMutations({
				adds:'adds',
				lessa:'lessa',
				changeM:'changeM'
			}),
			changeX(){
//				this.$store.commit('changeM',this.shopList)
				this.changeA(this.shopList)
			},
			add(id){
//				this.$store.commit('add',id)
//				this.adds(id)
				this.$store.dispatch('changeMu',id)
			},
			less(id){
//				this.$store.commit('less',id)
//				this.lessa(id)
				this.$store.dispatch('lessMu',id)
			}
		}
	}
</script>
<style lang='stylus'>
	
</style>