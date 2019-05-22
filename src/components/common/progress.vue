<template>
	<div class="schedule">
		<div class="text" ref='scale' @click='clickBar($event)'>
			<div class="scale" ref='scaleCon'>
				<span ref='scaleBtn'></span>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		name: 'progress1',
		props:{
			percent:{
				type: Number
			},
			percents:{
				type: Number
			}
		},
		watch:{
			percent(newData){
				if(newData){
					let widths = this.$refs.scale.clientWidth;
					let mainW = widths * this.percent;
					this.$refs.scaleCon.style.width = `${mainW}px`;
					this.$refs.scaleBtn.style.left = `${mainW}px`;
				}
			},
			percents(newData){
				if(newData){
					let widths = this.$refs.scale.clientWidth;
					let mainW = widths * this.percents;
					this.$refs.scaleCon.style.width = `${mainW}px`;
					this.$refs.scaleBtn.style.left = `${mainW}px`;
				}
			}
		},
		methods:{
			clickBar(e){
				this.$refs.scaleCon.style.width = `${e.offsetX}px`;
				this.$refs.scaleBtn.style.left = `${e.offsetX}px`;
				const barWidth = this.$refs.scale.clientWidth;
				let p = e.offsetX / barWidth;
				this.$emit('setParcent',p)
			}
		}
	}
</script>
<style lang='stylus'>
	.schedule
		position: absolute
		left: 30px
		bottom: 0
		.text
			position: relative
			width: 235px
			height: 10px
			background: #636363
			border-radius: 10px
			.scale
				position: absolute
				left: -5px
				top: 0
				width: 0px
				height: 10px
				background: #ffca30
				border-radius: 4px 0 0 4px
				span
					position: absolute
					left: 0
					bottom: -2px
					width: 10px
					height: 10px
					border: 2px solid #fff
					background: #ffca30
					border-radius: 45%
		span
			font-size: 14px
			line-height: 10px
			&:nth-of-type(1)
				margin-right: 5px
			&:nth-of-type(2)
				margin-left: 5px
</style>
