import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import songAPI from '../../api/songAPI';
import { randomAllSongs, randomSongListNextFunc } from '../../utils/randomSongs';
import storage from '../../utils/storage';
import { setIsPlaying } from '../Player/PlayerControl/playerControlSlice';

// storage
const songListNextStorage = storage('songListNext');
const songListPrevStorage = storage('songListPrev');
const currentSongStorage = storage('currentSong');

const initialState = {
  songListPrev: songListPrevStorage.get() || [],
  songListNext: songListNextStorage.get() || [],
  currentSong: currentSongStorage.get() || {},
  isLoading: false,
  message: '',
  error: null,
};

export const fetchSongsOfAlbum = createAsyncThunk('/songs-of-albums', async (payload, thunkAPI) => {
  try {
    const response = await songAPI.getSongs(payload);
    if (response.data.length) {
      thunkAPI.dispatch(setIsPlaying(true));
      const { playerControls } = thunkAPI.getState();
      if (playerControls.isRandom) {
        return {
          ...response,
          data: response.data.sort(() => Math.random() - 0.5),
        };
      }
      thunkAPI.dispatch(setIsPlaying(true));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    sortPlaylist(state, action) {
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      const { source, destination } = action.payload;
      if (!destination) {
        if (
          source.droppableId === 'songListPrev' &&
          newData.songListPrev[source.index]._id === newData.currentSong._id
        ) {
        } else {
          const songRemoved = newData[source.droppableId].splice(source.index, 1);
          toast.error(`🎶 Xoá bài hát "${songRemoved[0].name}" khỏi Danh sách phát`, {
            autoClose: 2000,
          });
        }
      } else {
        if (
          (newData.songListPrev.length === 1 &&
            destination.droppableId === 'songListNext' &&
            destination.droppableId === 'songListPrev') ||
          (source.droppableId === 'songListNext' &&
            destination.index === newData.songListPrev.length &&
            destination.droppableId === 'songListPrev') ||
          (source.droppableId === 'songListPrev' && destination.index === newData.songListPrev.length - 1) ||
          (source.droppableId === 'songListPrev' && newData.songListPrev[source.index]._id === newData.currentSong._id)
        ) {
        } else {
          const itemMove = newData[source.droppableId].splice(source.index, 1)[0];
          newData[destination.droppableId].splice(destination.index, 0, itemMove);
        }
      }
      if (newData.songListPrev.length === 0) {
        newData.currentSong = {};
      }
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      currentSongStorage.set(newData.currentSong);
      return {
        ...newData,
      };
    },
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
      currentSongStorage.set(action.payload);
    },
    chooseSong(state, action) {
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      let { songListPrev, songListNext } = newData;
      const indexSongListPrev = songListPrev.findIndex((s) => s?._id === action.payload._id);
      const indexSongListNext = songListNext.findIndex((s) => s?._id === action.payload._id);
      if (indexSongListPrev < 0) {
        if (indexSongListNext >= 0) {
          songListPrev.push(songListNext.splice(indexSongListNext, 1)[0]);
        } else {
          songListPrev.push(action.payload);
        }
      } else {
        newData.songListNext = songListPrev.splice(indexSongListPrev + 1, songListPrev.length).concat(songListNext);
      }
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      return {
        ...newData,
      };
    },
    addSongToSongListNext(state, action) {
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      // state.songListNext.push(action.payload)
      const songFoundInSongListNext = newData.songListNext.find((song) => song._id === action.payload._id);
      const songFoundInSongListPrev = newData.songListPrev.find((song) => song._id === action.payload._id);
      if (!songFoundInSongListNext && !songFoundInSongListPrev) {
        newData.songListNext.push(action.payload);
        toast.success(`🎶 Thêm bài hát "${action.payload.name}" vào Danh sách phát`, {
          autoClose: 1500,
        });
      } else {
        toast.warning(`🎶 Bài hát "${action.payload.name}" đã có trong Danh sách phát`, {
          autoClose: 1500,
        });
      }
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      return { ...newData };
    },
    nextSong(state, action) {
      const data = { ...current(state) };
      // console.log(action);
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      if (newData.songListNext.length > 0) {
        const songNext = newData.songListNext.splice(0, 1)[0];
        newData.currentSong = songNext;
        newData.songListPrev = [...newData.songListPrev, songNext];
        songListPrevStorage.set(newData.songListPrev);
        songListNextStorage.set(newData.songListNext);
        currentSongStorage.set(newData.currentSong);
      }
      return {
        ...newData,
      };
    },
    prevSong(state, action) {
      // console.log("click");
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      const songPrev = newData.songListPrev.splice(newData.songListPrev.length - 1, 1);
      newData.currentSong = newData.songListPrev[newData.songListPrev.length - 1];
      console.log(songPrev);
      newData.songListNext = [...songPrev, ...newData.songListNext];
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      currentSongStorage.set(newData.currentSong);
      return {
        ...newData,
      };
    },
    playAllSongs(state, action) {
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      const [firstSong, ...otherSongs] = action.payload;
      newData.songListPrev = [firstSong];
      newData.currentSong = firstSong;
      newData.songListNext = otherSongs;
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      currentSongStorage.set(newData.currentSong);
      return { ...newData };
    },
    randomSongListNext(state, action) {
      const data = { ...current(state) };
      // const newData = {
      //   ...data,
      //   songListPrev: [...data.songListPrev],
      //   songListNext: [...data.songListNext],
      //   currentSong: { ...data.currentSong },
      // };
      // const randomSongs = newData.songListNext.sort(() => Math.random() - 0.5);
      // songListNextStorage.set(randomSongs);
      // return { ...newData, songListNext: randomSongs };
      const { newSongListPrev, songListNextRandom } = randomSongListNextFunc(
        data.songListPrev,
        data.songListNext,
        data.currentSong
      );
      return { ...data, songListPrev: newSongListPrev, songListNext: songListNextRandom };
    },
    randomPlaylist(state, action) {
      const data = { ...current(state) };

      const { songListPrevRandom, songListNextRandom } = randomAllSongs(
        data.songListPrev,
        data.songListNext,
        data.currentSong
      );
      songListNextStorage.set(songListNextRandom);
      songListPrevStorage.set(songListPrevRandom);

      return { ...data, songListPrev: songListPrevRandom, songListNext: songListNextRandom };
    },
    removeSongListPrev(state, action) {
      const { isPlaying } = action.payload;
      const data = { ...current(state) };
      const newData = {
        ...data,
        songListPrev: [...data.songListPrev],
        songListNext: [...data.songListNext],
        currentSong: { ...data.currentSong },
      };
      if (newData.songListPrev.length > 1) {
        newData.songListPrev = [newData.currentSong];
      } else if (newData.songListPrev.length === 1 && !isPlaying) {
        const currentSongList = newData.songListNext.splice(0, 1);
        newData.songListPrev = currentSongList;
        if (newData.songListNext.length) {
          newData.currentSong = currentSongList[0];
        } else {
          newData.currentSong = {};
        }
      }
      songListPrevStorage.set(newData.songListPrev);
      songListNextStorage.set(newData.songListNext);
      currentSongStorage.set(newData.currentSong);

      return { ...newData };
    },
    removeSongListNext(state, action) {
      state.songListNext = [];
      songListNextStorage.set([]);
    },
  },
  extraReducers: {
    [fetchSongsOfAlbum.pending](state, action) {
      state.isLoading = true;
      state.songListPrev = [];
      state.songListNext = [];
      state.currentSong = {};
    },
    [fetchSongsOfAlbum.fulfilled](state, action) {
      state.isLoading = false;
      if (action.payload.data.length) {
        const [firstSong, ...otherSongs] = action.payload.data;
        state.songListPrev = [firstSong];
        state.songListNext = otherSongs;
        state.currentSong = firstSong;
        songListPrevStorage.set([firstSong]);
        songListNextStorage.set(otherSongs);
        currentSongStorage.set(firstSong);
      }
    },
    [fetchSongsOfAlbum.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default playlistSlice.reducer;
export const {
  sortPlaylist,
  setCurrentSong,
  chooseSong,
  addSongToSongListNext,
  nextSong,
  prevSong,
  playAllSongs,
  randomSongListNext,
  removeSongListPrev,
  removeSongListNext,
  randomPlaylist,
} = playlistSlice.actions;
