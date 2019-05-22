<template>
	<div id="box">
		<h1>用户登录</h1>
		<form>
			<label>
				<p v-show='msg'>{{msg}}</p>
				<input type="text" placeholder="请输入手机号" v-model='userName' @focus='focus()'/>
			</label>
			<label>
				<input type="text" placeholder="请输入验证码" v-model='code'/>
				<input type="button" value="获取验证码"  v-model='str' @click='getCode()'/>
			</label>
			<label>
				<input type="button" value="登录" @click='login()'/>
			</label>
		</form>
		<!--<p><router-link to='/register' class='text'>还没有账号，现在去注册</router-link></p>-->
		<p><router-link :to='{name:"register"}' class='text'>还没有账号，现在去注册</router-link></p>
		<p v-show='codeText'>验证码：{{codeText}}</p>
	</div>
</template>
<script>
	import {Toast,Indicator} from "mint-ui"
	export default{
		data(){
			return{
				str: '获取验证码',
				userName: '',
				msg: '',
				timer: '',
				codeText: '',
				btnOff: true,
				code: '',
				r:{}
			}
		},
		watch:{
			$route(to,from){
				this.r = to.query
			}
		},
		methods:{
			getCode(){
				if(!this.btnOff) return;
				let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/i;
				if(regPhone.test(this.userName)){
					this.$http.post('/apis/code',{userName: this.userName}).then(res => {
						console.log(res.data)
						this.codeText = res.data.code;
					})
					let num = 10;
					this.btnOff = false;
					this.timer = setInterval(() => {
						this.str = num + '秒后重发';
						if(num == 0){
							this.btnOff = true;
							this.str = '获取验证码';
							clearInterval(this.timer);
						}
						num--;
					},1000)
				}
			},
			login(){
				clearInterval(this.timer);
				let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/i;
				if(this.userName == '' || this.code == ''){
					this.msg = '请输入用户名或验证码';
				}else if(regPhone.test(this.userName) && this.code && this.code.toLowerCase() === this.codeText.toLowerCase()){
					Indicator.open({
						text: '加载中...',
					  	spinnerType: 'fading-circle'
					});
					this.$http.post('/apis/login1',{user: this.userName}).then(res => {
						setTimeout(() => {
							this.msg = res.data.msg;
							if(res.data.code == 0){
								Indicator.close();
								localStorage.setItem('userId',res.data.userId)
								localStorage.setItem('username',this.userName)
								Toast({
									message: '操作成功',
								  	iconClass: 'icon icon-success'
								});
								if(this.r.redirect){
									this.$router.push({
										path: this.r.redirect
									});
								} else {
									var data = this.$route.query									
									var arr = Object.keys(data)
									if(arr.length == 0){
										this.$router.push({
											name: 'main'
										})
									}else{
										this.$router.push({
											path: this.$route.query.redirect
										})
									}
								}
							}else{
								this.userName = '';
							}
						},1000);
					})
				}
			},
			focus(){
				this.msg = '';
			}
		},
		destroyed(){
			clearInterval(this.timer)
		}
	}
</script>
<style lang='stylus' scoped>
	#box
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		width: 100%
		height: 100%
		padding: 44px 21px 112px
		background: #fff
		box-sizing: border-box
		h1
			font-size: 18px
			font-weight: normal
			margin-bottom: 66px
			text-align: center
		form
			text-align: center
			label
				&:nth-of-type(1)
					input
						width: 331px
						height: 40px
						font-size: 13px
						background: #f3f3f3
						margin-bottom: 42px
						text-indent: 10px
				&:nth-of-type(2)
					display: flex
					input
						&:nth-of-type(1)
							width: 221px
							height: 40px
							font-size: 13px
							background: #f3f3f3
							margin-right: 10px
							margin-bottom: 30px
							text-indent: 10px
						&:nth-of-type(2)
							width: 98px
							height: 40px
							font-size: 17px
							color: #000
							background: #999
							padding: 6px 5px
							box-sizing: border-box
				&:nth-of-type(3)
					input
						width: 331px
						height: 50px
						color: #fff
						font-size: 20px
						background: #2a97fe
						margin-bottom: 32px
		p		
			text-align: center	
			.text
				color: #599fe2
				font-size: 17px
</style>
