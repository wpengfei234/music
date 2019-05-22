<template>
	<div class="searchInp">
		<p>
			<i class='iconfont icon-sousuo search'></i>
			<input type="text" placeholder="搜索歌曲、歌手" v-model='value'/>
			<i class='iconfont icon-guanbi close' v-show="value" @click='clear()'></i>
		</p>
	</div>
</template>
<script>
	export default{
		name: 'searchInp',
		data(){
			return {
				value:''
			}
		},
		watch:{
			value(newData){
				this.$emit('toQuery',newData)
			}
		},
		methods:{
			clear(){
				this.value = ''
			},
			setQuery(k){
				this.value = k;
			}
		}
	}
</script>
<style lang='stylus'>
	.searchInp
		position: relative
		p
			display: flex
			justify-content: center
			align-items: center
			position: relative
			width: 95%
			height: 36px
			margin-bottom: 25px
			i.search
				position: absolute
				top: 11px
				left: 8px
				width: 17px
				height: 17px
			input
				width: 100%
				height: 100%
				text-indent: 30px
				color: #fff
				background: #363636
				border-radius: 10px
			i.close
				font-size: 20px
				color: #fff
				margin-left: 10px
</style>
