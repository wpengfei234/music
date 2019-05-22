<template>
	<div class="loading">
		<img src="../../assets/loading.gif" width='24' height="24" alt="loading">
		<p><slot></slot></p>
	</div>
</template>
<script>
	export default{
		name: 'loading'
	}
</script>
<style lang='stylus'>
	.loading
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		width: 100%
		height: 50px
		background: #282828
		p
			font-size: 12px
			color: #fff
</style>
