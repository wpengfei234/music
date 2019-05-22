<template>
	<header id='header'>
		<i class='iconfont icon-kaishi logo'></i>
		<span>music player</span>
		<i class='iconfont icon-icon- user'></i>
	</header>
</template>
<script>
	export default{
		data(){
			return{
				user:''
			}
		},
		mounted(){
			this.ret()
		},
		methods:{
			ret(){
				this.user = localStorage.getItem('username');
			}
		}
	}
</script>
<style lang="stylus" scoped>
	#header
		display: flex
		justify-content: center
		align-items: center
		width: 100%
		height: 42px
		background: #282828
		box-sizing: border-box
		i
			display: inline-block
			font-size: 18px
			color: #dec806
			&.user
				padding-left: 70px
		span
			font-size: 16px
			font-weight: 700
			line-height: 20px
			color: #dec806
			margin-left: 20px
</style>