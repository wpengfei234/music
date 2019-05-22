<template>
	<scroll id="recommend">
		<div>
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for='item,index in pic' :key='index'>
					<img :src="item.picUrl" alt="pic" />
				</mt-swipe-item>
			</mt-swipe>
			<div class="title">
				<h3>热门歌单推荐</h3>
			</div>
			<loading v-show='loadingVisible'>
				<p>加载中...</p>
			</loading>
			<div class="content">
				<div v-show='!content.length' style='color:#fff' class='text'>暂无更多数据</div>
				<ul v-for='item,index in content' :key='index'>
					<li @click='decoder(item)'>
						<img v-lazy="item.imgurl" alt=""/>
						<div class="con">
							<h3>{{item.dissname}}</h3>
							<p>{{item.creator.name}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<songlist :show='visible' :title='title' :imgSrc='imgSrc' :listData='listData' @hide='isShow' v-show='title' :recommend='showRecommend'></songlist>
	</scroll>
</template>
<script>
	import { Swipe,SwipeItem } from 'mint-ui';
	import Scroll from '@/components/scroll/scroll';
	import loading from '@/components/loading/loading';
	import songlist from '@/components/common/songlist';
	export default{
		data(){
			return {
				pic:[],
				content: [],
				loadingVisible: true,
				visible: false,
				title: '',
				imgSrc: '',
				listData: [],
				showRecommend: false
			}
		},
		components:{
			Scroll,
			loading,
			songlist
		},
		mounted(){
			this.getPicData();
			this.$http.get('../../static/data/sort.json').then(res => {
				this.content = res.data.data.list;
			})
		},
		methods:{
			getPicData(){
				this.$http.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1557719371639&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1').then(res => {
					if(res.data){
						this.loadingVisible = false;
						this.pic = res.data.data.slider;
					}
				})
			},
			isShow(){
				this.title = '';
			},
			decoder(item){//点击显示详情页
				this.visible = true;
				this.title = item.dissname;
				this.imgSrc = item.imgurl;
				this.showRecommend = true;
				this.$http.get('../../../static/data/recommondSong.json').then(res => {
					this.listData = res.data.cdlist[0].songlist;
					this.listData.forEach((item) => {
						let newData = {
							'images':`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
                            'url': `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${item.songmid}.m4a?guid=3237420644&vkey=3AEA2C41B4BE4A2A3240C022AAA768BB02B179F3CE95FEB5BE9842D6724939C8C694FB5A87020D28392DE1B4FE6F08136533CC52506A406D&uin=0&fromtag=38
`

						}
						this.$set(item,'newData',newData);//在listData数组中添加newData字段
						this.listData.push(item);
					})
				})
			}
		}
	}
</script>
<style lang="stylus">
	#recommend
		height: 580px
		background: #282828
		box-sizing: border-box
		overflow: hidden
		div
			.mint-swipe
				width: 100%
				height: 200px
				background: #ccc
				.mint-swipe-item
					img
						width: 100%
						height: 100%
				.mint-swipe-indicators
					.mint-swipe-indicator
						&.is-active
							width: 20px
							opacity: 1
							border-radius: 8px
							background: #fff
			.title
				width: 100%
				height: (115px/2)
				background: #282828
				h3
					font-size: 14px
					text-align: center
					line-height: (115px/2)
					color: #ffde34
			.content
				.text
					display: flex
					justify-content: center
					align-items: center
				ul
					padding: 0 (35px/2)
					box-sizing: border-box
					li
						display: flex
						margin-bottom: 20px
						img
							width: (115px/2)
							height: (115px/2)	
							margin-right: 16px
						.con
							flex: 1	
							display: flex
							flex-direction: column
							justify-content: center
							align-items: flex-start
							h3
								font-size: 14px
								color: #fff
								margin-bottom: 15px
							p
								font-size: 12px
								color: #616161 
				
				
				
				
				
				
				
				
				
				
</style>