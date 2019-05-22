export const song = state => state.song
export const curIndex = state => state.curIndex
export const curSong = state => state.curSong

export const playing = state => state.playing
export const playList = state => state.playList
export const currentSong = state => {
	return state.playList[state.curIndex]
}