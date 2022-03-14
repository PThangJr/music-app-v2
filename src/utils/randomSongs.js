export const randomAllSongs = (songListPrev, songListNext, currentSong) => {
  const playlistWithoutCurrentSong = [...songListPrev, ...songListNext].filter((song) => song._id !== currentSong._id);
  const playlistRandom = playlistWithoutCurrentSong.sort(() => Math.random() - 0.5);

  const randomLengthSongListPrev = Math.floor(Math.random() * (playlistRandom.length - 1));

  const songListPrevRandom = [...playlistRandom.splice(0, randomLengthSongListPrev), currentSong];
  const songListNextRandom = playlistRandom;
  return {
    songListPrevRandom,
    songListNextRandom,
  };
};
export const randomSongListNextFunc = (songListPrev, songListNext, currentSong) => {
  const newSongListPrev = [currentSong];
  const songListPrevData = [...songListPrev];
  songListPrevData.splice(-1);
  const songListNextRandom = [...songListNext, ...songListPrevData].sort(() => Math.random() - 0.5);

  return { newSongListPrev, songListNextRandom };
};

// const randomSongs = (songListPrev, songListNext, currentSong) => {
//   // console.log(songListPrev, songListNext);
//   const songListPrevRandom = [currentSong];
//   const newSongListPrev = [...songListPrev];
//   newSongListPrev.splice(-1);
//   const songListNextRandom = [...songListNext, ...newSongListPrev].sort(() => Math.random() - 0.5);
//   return {
//     songListPrevRandom,
//     songListNextRandom,
//   };
// };
// export default randomSongs;
