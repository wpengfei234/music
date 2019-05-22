<template>
	<transition name='fade'>
		<div class="transmit">
			<div class="content">
				<img :src='currentSong.newData.images' alt='/' class="bg_img" v-if="currentSong.newData"/>
				<img :src='currentSong.musicData.newData.images' alt='/' class="bg_img" v-if="!currentSong.newData"/>
				<div class="transmit_top">
					<i class='iconfont icon-jiantou' @click="back()"></i>
					<div class="title">
						<h3>{{currentSong.songname || currentSong.musicData.songname}}</h3>
						<span v-if='currentSong.singer'>{{currentSong.singer[0].name}}</span>
						<span v-if='!currentSong.singer'>{{currentSong.musicData.singer[0].name}}</span>
					</div>
					<div class="rotate" :class="rotate">
						<img :src="currentSong.newData.images" alt="/" class="rotate_img" v-if="currentSong.newData"/>
						<img :src="currentSong.musicData.newData.images" alt="/" class="rotate_img" v-if="!currentSong.newData"/>
					</div>
				</div>
			</div>
			<div class='gress'>
				<span class="time1">{{curTime | formate(curTime)}}</span>
				<progress1 :percent='percent' :percents='percents' @setParcent='setParcent'></progress1>
				<span class="time1" v-if='currentSong.interval'>{{currentSong.interval | formate(currentSong.interval)}}</span>
				<span class="time1" v-if='!currentSong.interval'>{{currentSong.musicData.interval | formate(currentSong.musicData.interval)}}</span>
			</div>
			<audio :src="currentSong.newData.url" ref='curAudio' @timeupdate='timeupdate($event)' v-if='currentSong.newData'></audio>
			<audio :src="currentSong.musicData.newData.url" ref='curAudio' @timeupdate='timeupdate($event)' v-if='!currentSong.newData'></audio>
			<div class="ctrl">
				<i class='iconfont icon-xunhuanbofang'></i>
				<i class='iconfont icon-icon-2' @click="prev()"></i>
				<i class='iconfont icon-kaishi1' :class="playing?'icon-zanting':'icon-kaishi1'" @click="stop()"></i>
				<i class='iconfont icon-icon-1' @click='next()'></i>
				<i class="iconfont icon-xinxing"></i>
			</div>
		</div>
	</transition>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	import progress1 from './progress'
	export default{
		name: 'transmit',
		data(){
			return{
				curTime: 0
			}
		},
		components: {
			progress1
		},
		computed: {
			...mapGetters(['curIndex','playList','currentSong','playing']),
			//图片旋转是否停在当前位置
			rotate(){
				return this.playing?'active':'active pause'
			},
			percent(){
				if(this.currentSong){
					return this.curTime / this.currentSong.interval
				}
			},
			percents(){
				if(this.currentSong.musicData){
					return this.curTime / this.currentSong.musicData.interval
				}
			}
		},
		mounted(){
			this.playing?this.$refs.curAudio.play():this.$refs.curAudio.pause()
		},
		watch:{
			currentSong(){
				this.$nextTick(() => {
					this.$refs.curAudio.play()
				})
			},
			//playing为true，音乐播放，否则暂停
			playing(){
				this.playing?this.$refs.curAudio.play():this.$refs.curAudio.pause()
			}
		},
		methods:{
			...mapMutations(['setCurIndex','setPlayList','setPlaying']),
			//暂停播放
			stop(){
				this.setPlaying(!this.playing)
			},
			//返回
			back(){
				this.$router.go(-1)
			},
			//进度条
			timeupdate(e){
				this.curTime = e.target.currentTime;
				let newtime = Math.floor(this.curTime);
				if(newtime === this.currentSong.interval){
					let index = this.curIndex + 1;
					this.setCurIndex(index);
					this.$refs.curAudio.play();
				}
			},
			//下一首
			next(){
				let index = this.curIndex + 1;
				if(index > this.playList.length){
					index = 0
				}
				this.setCurIndex(index)
				if(!this.playing){
					this.stop()
				}
			},
			//上一首
			prev(){
				let index = this.curIndex - 1;
				if(index < 0){
					index = this.playList.length - 1
				}
				this.setCurIndex(index)
				if(!this.playing){
					this.stop()
				}
			},
			setParcent(p){
				this.curTime = this.$refs.curAudio.currentTime = p * this.currentSong.interval;
			}
		},
		//过滤器实现时间
		filters:{
			formate(time){
				let minutes = Math.floor(time/60);
				let seconds = Math.floor(time%60);
				if(minutes <= 9){minutes='0'+minutes};
				if(seconds <= 9){seconds='0'+seconds};
				return minutes+':'+seconds
			}
		}
	}
</script>
<style lang='stylus'>
	.transmit
		position: absolute
		top: 0
		left: 0
		width: 100vw
		height: 100vh
		&.fade-enter,&.fade-leave-to
			transform: translateX(-100vw)
		&.fade-enter-active,&.fade-leave-active
			transition: all 500ms
		&.fade-enter-to,&.fade-leave
			transform: translateX(0)
		.content
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			img.bg_img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
				filter: blur(40px)
				z-index: -1
			.transmit_top
				display: flex
				padding: 10px
				box-sizing: border-box
				i
					display: inline-block
					width: 20px
					height: 20px
					font-size: 20px
					color: #ffca30
					transform: rotate(-90deg)
				.title
					flex: 1
					display: flex
					flex-direction: column
					justify-content: center
					align-items: center
					width: 90%
					color:#fff
					h3
						width: 80%
						font-size: 16px
						text-align: center
						margin-bottom: 11px
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
					span
						font-size: 14px
						margin-left: -4px
				.rotate
					position: absolute
					top: 80px
					left: 50%
					width: 225px
					height: 225px
					margin-left: (-225px/2)
					background: #979797
					border-radius: 50%
					&.active
						animation: run 3s infinite linear
					&.pause
						animation-play-state: paused
					@keyframes run{
						0%{
							transform: rotate(0deg)
						}	
						100%{
							transform: rotate(360deg)
						}
					}
						
					.rotate_img
						position: absolute
						top: 50%
						left: 50%
						width: 208px
						height: 208px
						margin-left: -104px
						margin-top: -104px
						background: #f00
						border-radius: 50%
		.gress
			position: absolute
			left: 35px
			bottom: 85px
			span
				font-size: 12px
				&:nth-of-type(1)
					position: absolute
					left: -15px
					bottom: -3px
				&:nth-of-type(2)
					position: absolute
					left: 275px
					bottom: -3px
		.ctrl
			display: flex
			justify-content: space-around
			align-items: center
			position: absolute
			left: 30px
			bottom: 32px
			width: 80%		
			i
				font-size: 25px
				color: #ffca30
				&:first-child
					font-size: 22px
				&:last-child
					font-size: 20px
</style>