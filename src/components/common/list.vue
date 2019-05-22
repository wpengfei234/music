<template>
	<div>
		<div class="list_content">
			<ul class="detail_list">
				<li v-for='item,index in listData' :key='index' v-if='recommend' @click='goPlay(item,index)'>
					<div>
						<h3>{{item.songname}}</h3>
						<p class='name'>{{item.singer[0].name}}</p>
					</div>
				</li>
				<li v-for='item,index in listData' :key='index' v-if='singer' @click='goPlay(item,index)'>
					<div>
						<h3>{{item.musicData.songname}}</h3>
						<p class='name'>{{item.musicData.singer[0].name}}·{{item.musicData.albumname}}</p>
					</div>
				</li>
				<li v-for='item,index in listData' :key='index' v-if='ranking' @click='goPlay(item,index)'>
					<p v-if='ranking' :class='getIcon(index)' class="title">
						<span v-if='index > 2'>{{getIcon(index)}}</span>
					</p>
					<div>
						<h3>{{item.name}}</h3>
						<p class='name'>{{item.singer[0].name}}·{{item.album.name}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {mapMutations} from 'vuex'
	export default{
		name: 'list',
		data(){
			return{
				title: ''
			}
		},
		props:{
			listData:{
				type: Array,
				default:() => []
			},
			recommend:{
				type: Boolean
			},
			singer:{
				type: Boolean
			},
			ranking:{
				type: Boolean
			}
		},
		methods:{
			...mapMutations({
				// setSong1:'setSong',
				setCurIndex1: 'setCurIndex',
				// setCurSong1: 'setCurSong'
				setPlayList:'setPlayList',
				setPlaying: 'setPlaying'
			}),
			//添加图标
			getIcon(index){
				if(index <= 2){
					return `icon${index}`
				} else{
					return ++index
				}
			},
			//点击每个li跳转到播放页面
			goPlay(item,index){
				// this.setSong1(this.listData),
				this.setCurIndex1(index),
				// this.setCurSong1(item)
				this.setPlayList(this.listData),
				this.setPlaying(true),
				this.$router.push({
					path: '/transmit'
				})
			}
		}
	}
</script>
<style lang='stylus'>
	.list_content
		background: #282828
		.detail_list
			padding: 20px 17px 0
			box-sizing: border-box
			li
				display: flex
				p.title
					width: 42px
					height: 35px
					text-align: center
					margin-right: 10px
					&.icon0
						background: url('../../assets/img/1.png') no-repeat 7px 7px
					&.icon1
						background: url('../../assets/img/2.png') no-repeat 7px 7px
					&.icon2
						background: url('../../assets/img/3.png') no-repeat 7px 7px
					span
						font-size: 18px
						line-height: 45px
						color: #fbcc42
				div
					flex: 1
					display: flex
					flex-direction: column
					justify-content: center
					align-items: flex-start
					padding-bottom: 16px
					box-sizing: border-box
					h3
						display: inline-block
						width: 65%
						height: 25px
						font-size: 18px
						color: #fff
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
						box-sizing: border-box
					p.name
						font-size: 16px
						color: #7c7c7c
</style>