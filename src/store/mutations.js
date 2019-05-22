const mutations = {
	setSong(state,song){
		state.song = song
	},
	//设置当前下标
	setCurIndex(state,curIndex){
		state.curIndex = curIndex
	},
	// setCurSong(state,curSong){
	// 	state.curSong = curSong
	// }
	//设置列表
	setPlayList(state,playList){
		state.playList = playList
	},
	//设置显示隐藏属性
	setPlaying(state,playing){
		state.playing = playing
	}
}
export default mutations