<template>
	<nav class='nav'>
		<ul>
			<li v-for='item of navs' :key='item.name'>
				<router-link :to='item.to'>{{item.name}}</router-link>
			</li>
		</ul>
	</nav>
</template>
<script>
	export default{
		name: 'my-nav',
		data(){
			return {
				navs: [
					{
						name: '推荐',
						to: 'recommend'
					},{
						name: '歌手',
						to: 'singer'
					},{
						name: '排行',
						to: 'ranking'
					},{
						name: '搜索',
						to: 'search'
					}
				]
			}
		}
	}
</script>
<style lang='stylus' scoped>
	.nav
		width: 100%
		height: 45px
		background: #282828
		margin-top: -1px
		ul
			display: flex
			justify-content: center
			align-items: center
			li
				flex: 1
				font-size: 12px
				text-align: center
				line-height: 45px
				a
					color: #a7a7a7
					padding-bottom: 4px
					box-sizing: border-box
					&.router-link-active
						color: #dec806
						border-bottom: 2px solid #dec806
</style>