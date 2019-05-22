<template>
	<div id="search">
		<search-inp @toQuery='toQuery' ref='setSearch'></search-inp>
		<div class="search_content" v-show='!toQuerys'>
			<h3>热门搜索</h3>
			<ol>
				<li v-for='item,index in search' :key='index' @click="setSearch(item.k)">{{item.k}}</li>
			</ol>
		</div>
		<search-list :toquery='toQuerys'></search-list>
	</div>
</template>
<script>
	import searchInp from '@/components/common/searchInp'
	import searchList from '@/components/common/searchList'
	export default{
		data(){
			return{
				search: [],
				toQuerys: ''
			}
		},
		components:{
			searchInp,
			searchList
		},
		mounted(){
			this.searchs();
		},
		methods:{
			toQuery(query){
				this.toQuerys = query;
			},
			searchs(){
				this.$http.get('/api/splcloud/fcgi-bin/gethotkey.fcg?_=1557749074951&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1').then(res => {
						this.search = res.data.data.hotkey;
				})
			},
			setSearch(k){
				this.$refs.setSearch.setQuery(k);
			}
		}
	}
</script>
<style lang='stylus'>
	#search
		padding: 0 20px 0
		height: 580px
		background: #282828
		box-sizing: border-box
		.search_content
			h3
				font-size: 12px
				color: #939393
				padding-bottom: 18px
				box-sizing: border-box			
			ol	
				display: flex
				flex-wrap: wrap
				justify-content: center
				align-items: center
				li
					padding: 5px 7px
					margin-right: 18px
					margin-bottom: 9px
					font-size: 16px
					color: #717171
					background: #363636
					border-radius: 10px
					box-sizing: border-box	
	
				
</style>