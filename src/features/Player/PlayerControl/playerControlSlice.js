import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  isPlayingVideo: false,
  videoPlay: "",
  isRandom: false,
  isRepeat: false,
};
const playerControlsSlice = createSlice({
  name: "player-controls",
  initialState,
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setIsRepeat(state, action) {
      state.isRepeat = action.payload;
    },
    setIsRandom(state, action) {
      state.isRandom = action.payload;
    },
    setIsPlayingVideo(state, action) {
      state.isPlayingVideo = action.payload;
    },
    setVideoPlay(state, action) {
      state.videoPlay = action.payload;
    },
  },
});
export default playerControlsSlice.reducer;
export const {
  setIsPlaying,
  setIsRepeat,
  setIsRandom,
  setIsPlayingVideo,
  setVideoPlay,
} = playerControlsSlice.actions;
