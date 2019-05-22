<template>
	<div ref='wrapper'>
		<slot></slot>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	export default{
		data(){
			return{
				s:{}
			}
		},
		mounted(){
			setTimeout(() => {
				this.init();
			},1000)
		},
		methods:{
			init(){
				this.s = new Bscroll(this.$refs.wrapper,{
					click: true,
					probeType: 3
				})
			}
		}
	}
</script>
<style>
	
</style>