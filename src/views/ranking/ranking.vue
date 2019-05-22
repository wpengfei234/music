<template>
	<scroll id="ranking">
		<ol>
			<li v-for='item,index in rankings' :key='index' v-show='index < 10' @click='decoder(item)'>
				<img v-lazy="item.picUrl" alt="" />
				<div class="song">
					<p v-for='item1,index in item.songList' :key='index'>
						<span>{{index+1}}&nbsp;{{item1.songname}}-{{item1.singername}}</span>
					</p>
				</div>
			</li>
		</ol>
		<ranklist :show='visible' :title='title' :imgSrc='imgSrc' :listData='listData' @hide='isShow' v-show='title' :ranking='showRanking'></ranklist>
	</scroll>
</template>
<script>
	import Scroll from "@/components/scroll/scroll"
	import ranklist from '@/components/common/ranklist'
	export default{
		data(){
			return{
				rankings: [],
				visible: false,
				title: '',
				imgSrc: '',
				listData: [],
				showRanking: false
			}
		},
		components:{
			Scroll,
			ranklist
		},
		mounted(){
			this.ranking();
		},
		methods:{
			ranking(){
				this.$http.get('/api/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1557730638305&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1').then(res => {
					this.rankings = res.data.data.topList;
				})
			},
			isShow(){
				this.title = '';
			},
			decoder(item){//点击图片显示详情页
				this.visible = true;
				this.title = item.topTitle;
				this.imgSrc = item.picUrl;
				this.showRanking = true;
				this.$http.get('../../../static/data/rankingView.json').then(res => {
					this.listData = res.data.req_0.data.tracks;
					this.listData.forEach((item) => {
						let newData = {
							'images':`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
					        'url': `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${item.songmid}.m4a?guid=3076802792&vkey=1F3233DE743300135A199F213BD52CBC5FA2DC2E8E893B7E3B23E6226DE1DC0D088640D671AC54476E07E0111C8BD15CD5F9697DFED861F1&uin=0&fromtag=38`
					
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
	#ranking
		height: 560px
		padding: 0 18px 0
		background: #282828
		box-sizing: border-box
		overflow: hidden
		ol 
			padding-top: 20px
			li
				display: flex
				justify-content: center
				align-items: center
				margin-bottom: 16px
				background: #363636
				img
					width: 90px
					height: 90px
				.song
					flex: 1
					display: flex
					flex-direction: column
					justify-content: center
					align-items: flex-start
					height: 90px
					padding: 15px 0 15px 15px
					box-sizing: border-box
					p
						width: (428px/2)
						font-size: 12px
						color: #707070
						padding-bottom: 15px
						box-sizing: border-box
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
						
						
						
</style>