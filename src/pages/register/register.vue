<template>
	<div id="box">
		<h1>用户注册</h1>
		<form>
			<label><input type="text" placeholder="用户名"/></label>
			<label><input type="text" placeholder="密码"/></label>
			<label><input type="text" placeholder="确认密码"/></label>
			<label><input type="checkbox" @click="show"/><span>条件已阅读</span></label>
			<label><input type="submit" value="注册" :class='{active:visible}'/></label>
		</form>
		<!--<p><router-link to='/login' class='text' :class='{active:visible}'>已有账号，去登录</router-link></p>-->
		<p><router-link :to='{name:"login"}' class='text' >已有账号，去登录</router-link></p>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				visible: false
			}
		},
		methods:{
			show(){
				this.visible = !this.visible;
			}
		}
	}
</script>
<style lang="stylus" scoped>
	#box
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		width: 100% 
		height: 100%
		padding: 44px 21px 112px
		box-sizing: border-box
		h1
			font-size: 18px
			font-weight: normal
			margin-bottom: 66px
			text-align: center
		form
			display: flex
			flex-direction: column
			justify-content: center
			align-items: flex-start
			label
				&:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3)
					input
						display: inline-block
						width: 331px
						height: 41px
						font-size: 13px
						color: #757575
						background: #f3f3f3
						margin-bottom: 31px
						text-indent: 10px
				&:nth-of-type(4)
					display: flex
					flex-direction: row
					justify-content: center
					align-items: flex-start
					margin-bottom: 19px
					input
						width: 15px
						height: 15px
						margin-right: 10px
					span
						font-size: 12px
				&:nth-of-type(5)
					input
						display: inline-block
						width: 331px
						height: 48px
						font-size: 20px
						color: #fefefe
						background: #999
						margin-bottom: 32px
						&.active
							background: #599fe2
		p		
			text-align: center	
			font-size: 17px
			.text
				color: #599fe2
				
</style>