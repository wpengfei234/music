<template>
	<div class="searchList" v-show="toquery">
		<div>
			<!-- <p>暂无更多数据</p> -->
			<ul>
				<li v-for='item,index in songData' :key='index'>
					<i class="iconfont icon-yinyue"></i>
					<span>{{item.name}}-{{item.singer}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'searchList',
		props:{
			toquery:{
				type: String,
				default: ''
			}
		},
		data(){
			return {
				songData: []
			}
		},
		watch:{
			toquery(){
				this.searchData()
			}
		},
		methods:{
			searchData(){
				this.$http.get(`/api/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=${this.toquery}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`).then(res => {
					if(res.data.code == 0 && res.data.data.song){
						this.songData = res.data.data.song.itemlist;
					}
				})
			}
		}
	}
</script>
<style lang="stylus">
	.searchList
		position: absolute
		top: 125px
		left: 20px
		width: 85%
		height: 100%
		div
			padding: 20px
			background: #ddd
			border-radius: 10px
			box-sizing: border-box
			ul
				li
					width: 100%
					height: 40px
					padding: 10px 0
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					box-sizing: border-box
					span
						font-size: 16px
						color: #7c7c7c
						
</style>
