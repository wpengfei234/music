<template>
	<div id="main">
		<cmp-header/>
  		<my-nav/>
  		<router-view/>
	</div>
</template>
<script>
	import CmpHeader from '@/components/header/header'
	import myNav from './nav/nav.vue'
	
	
	export default{
		name: 'mains',
		components: {
			CmpHeader,
			myNav
		}
	}
</script>
<style lang='stylus' scoped>
	#main
		width: 100%
		height: 100%
</style>