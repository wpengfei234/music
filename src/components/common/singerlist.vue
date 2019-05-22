<template>
	<transition name='fade'>
		<div class="detail" v-show='show'>
			<div class="detail_top">
				<div class="content">
					<i class="back iconfont icon-jiantou" @click='back()'></i>
					<h2>{{title}}</h2>
				</div>
				<img :src="imgSrc" alt="img" />
				<div class="button">
					<i class="iconfont icon-kaishi1"></i>
					<span>随机播放全部</span>
				</div>
			</div>
			<scroll class='detail_content'>
				<div>
					<list :listData='listData' :singer='singer'></list>
				</div>
			</scroll>
		</div>
	</transition>
</template>
<script>
	import Scroll from '@/components/scroll/scroll'
	import list from '@/components/common/list'
	
	export default{
		name: 'singer',
		data(){
			return{
				titles: ''
			}
		},
		props:{
			title:{
				type: String
			},
			imgSrc:{
				type: String
			},
			listData:{
				type: Array,
				default: () => []
			},
			show:{
				type: Boolean
			},
			singer:{
				type: Boolean
			}
		},
		components:{
			Scroll,
			list
		},
		methods:{
			back(){//点击返回详情页隐藏
				this.$emit('hide')
			}
		}
	}
</script>
<style lang='stylus'>
	.detail
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: #282828
		overflow: hidden
		z-index: 100
		&.fade-enter,&.fade-leave-to
			transform: translateX(-100%)
		&.fade-enter-active,&.fade-leave-active
			transition: all 500ms
		&.fade-enter-to,&.fade-leave
			transform: translateX(0)
		.detail_top
			position: relative
			width: 100%
			height: 338px
			background-size: 100%
			box-sizing: border-box
			.content
				position: absolute
				top: 0
				left: 0
				padding-top: 10px
				z-index: 3
				.back
					float: left
					font-size: 20px
					color: #ffde34
					margin-left: 15px
				h2
					display: block
					width: 375px
					height: 20px
					text-align: center
					font-size: 20px
					color: #fff
			img
				width: 100%
				height: 100%
			.button
				position: absolute
				left: 50%
				bottom: 25px
				width: 110px
				height: 28px
				font-size: 12px
				color: #ffde34
				padding: 4px 10px
				margin-left: -55px
				border: 1px solid #ffde34
				border-radius: 20px
				box-sizing: border-box
				i
					font-size: 10px
		.detail_content
			height: 330px
			overflow: hidden
			
</style>