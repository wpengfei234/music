<template>
	<div id="singer">
		<scroll class='sing' ref='left'>
			<div>
				<div class="content"  v-for='item,index in singer' :key='index' ref='singlist'>
					<h1>{{item.title}}</h1>
					<ul>
						<li v-for='items,index in item.items' :key='index' @click='decoder(items)'>
							<img v-lazy="items.avaor" alt="singer_pic" />
							<div>
								<h3>{{items.name}}</h3>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
		<div class="tags">
			<ol>
				<li v-for='item,index in singer' :key='index' :class='{active:index === curIndex}' @click='goItem(index)'>{{item.title}}</li>
			</ol>
		</div>
		<singer :show='visible' :title='title' :imgSrc='imgSrc' :listData='listData' @hide='isShow' v-show='title' :singer='showSinger'></singer>
	</div>
</template>
<script>
	import Scroll from '@/components/scroll/scroll';
	import singer from '@/components/common/singerlist';
	export default{
		data(){
			return{
				singer:[],
				leftScroll: {},
				scrollY: 0,
				heightArr: [],
				visible: false,
				title: '',
				imgSrc: '',
				listData: [],
				showSinger: false
			}
		},
		components:{
			Scroll,
			singer
		},
		computed:{
			//滚动显示对应的区域
			curIndex(){//判断当前索引
				let h = this.heightArr;
				for(let i = 0;i < h.length;i++){
					let height1 = h[i];
					let height2 = h[i + 1];
					if(this.scrollY >= height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0;
			}
		},
		mounted(){
			this.getData();
			setTimeout(() => {
				this.init();
				this.calc();
			},1000)
		},
		methods:{
			getData(){
				this.$http.get('../../static/data/singer.json').then(res => {
					this.singer = this.getMap(res.data.data.list);
				})
			},
			getMap(list){
				let map = {
					hot:{
						title: '热门',
						items: []
					}
				}
				list.forEach((item,index) => {
					if(index <= 10){//热门的十条数据
						map.hot.items.push({
							name: item.Fsinger_name,
							id: item.Fsinger_mid,
							avaor: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`
						})
					}
					//字母的数据
					const key = item.Findex;
					if(!map[key]){
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push({
						name: item.Fsinger_name,
						id: item.Fsinger_mid,
						avaor: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg`
					})
				})
				let ret = [];//装字母的
				let hot = [];//装热门的
				for(let key in map){
					let val = map[key];//map中的每一项
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val)
					}else if(val.title ==='热门'){
						hot.push(val)
					}
				}
				ret.sort((a,b) => {
					return a.title.charCodeAt() - b.title.charCodeAt();
				})
				return hot.concat(ret)
			},
			init(){//better-scroll初始化
				this.leftScroll = this.$refs.left.s;
				this.leftScroll.on('scroll',pos1 => {
					this.scrollY = Math.abs(Math.round(pos1.y));
				})
			},
			calc(){//获取每个盒子距离父级的高度
				let height = 0;
				let singlist = this.$refs.singlist;
				this.heightArr.push(height);
				for(let i = 0;i < singlist.length;i++){
					height += singlist[i].clientHeight;
					this.heightArr.push(height);
				}
			},
			goItem(index){//点击右边显示左边对应的区域
				let singlist = this.$refs.singlist;
				let el = singlist[index];
				this.leftScroll.scrollToElement(el,500);
			},
			isShow(){
				this.title = '';
			},
			decoder(item){//点击图片显示详情页
				this.visible = true;
				this.title = item.name;
				this.imgSrc = item.avaor;
				this.showSinger = true;
				this.$http.get('../../../static/data/singerView.json').then(res => {
					this.listData = res.data.data.list;
					this.listData.forEach((item) => {
						let newData = {
							'images':`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.musicData.albummid}.jpg?max_age=2592000`,
					        'url': `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${item.musicData.songmid}.m4a?guid=3237420644&vkey=3AEA2C41B4BE4A2A3240C022AAA768BB02B179F3CE95FEB5BE9842D6724939C8C694FB5A87020D28392DE1B4FE6F08136533CC52506A406D&uin=0&fromtag=38
`
					
						}
						this.$set(item.musicData,'newData',newData);//在listData数组中添加newData字段
						this.listData.push(item);
					})
				})
			}
		}
	}
</script>
<style lang='stylus'>
	#singer
		.sing
			height: 580px
			background: #282828
			overflow: hidden
			div
				.content
					h1
						width: 100%
						height: 23px
						font-size: 14px
						padding-left: 18px 
						color: #999
						background: #363636
						box-sizing: border-box
					ul
						padding: 0 25px
						box-sizing: border-box
						li
							display: flex
							margin-top: 18px
							&:last-child
								margin-bottom: 18px
							img
								width: 50px
								height: 50px
								border-radius: 50%
							div
								flex: 1
								display: flex
								flex-direction: column
								justify-content: center
								align-items: flex-start
								margin-left: 16px
								h3
									font-size: 14px
									color: #7f7f7f
		.tags
			position: fixed
			top: 210px
			right: 0
			width: 18px
			padding: 10px 0 	
			background: #1c1c1c		
			border-radius: 10px
			box-sizing: border-box
			ol
				li
					width: 18px
					height: 18px
					font-size: 12px
					text-align: center
					line-height: 18px
					color: #636363
					overflow: hidden
					&.active
						color: #ffd532	
								
								
</style>