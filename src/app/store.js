import { configureStore } from '@reduxjs/toolkit';
import currentSongReducer from '../features/Player/currentSongSlice';
import playerControlReducer from '../features/Player/PlayerControl/playerControlSlice';
import playlistReducer from '../features/Playlist/playlistSlice';
import albumReducer from '../pages/albums/albumSlice';
import albumsOfAlbumGroupsReducer from '../pages/albums/albumsOfAlbumGroupsSlice';
import albumGroupReducer from '../pages/album_groups/albumGroup';
import authReducer from '../pages/auths/authSlice';
import categoryReducer from '../pages/categories/categorySlice';
import categroryDetailReducer from '../pages/categories/category_detail/categoryDetailSlice';
import favoriteSongReducer from '../pages/favorites/favoriteSongSlice';
import songOfRankingReducer from '../pages/rank/songOfRankingSlice';
import searchReducer from '../pages/search/searchSlice';
import singerReducer from '../pages/singers/singerSlice';
import singerDetailReducer from '../pages/singers/singer_detail/singerDetailSlice';
import songReducer from '../pages/songs/songSlice';
import displayListReducer from '../features/Playlist/displayPlaylistSlice';
import displayVideoReducer from '../features/Video/displayVideoSlice';
import timeListenReducer from '../features/Player/PlayerControl/timeListenSlice';
const store = configureStore({
  reducer: {
    auths: authReducer,

    albums: albumReducer,
    albumsOfAlbumGroups: albumsOfAlbumGroupsReducer,
    albumGroups: albumGroupReducer,

    songs: songReducer,
    songsOfRanking: songOfRankingReducer,
    currentSong: currentSongReducer,
    playerControls: playerControlReducer,
    favoriteSongs: favoriteSongReducer,
    playlist: playlistReducer,
    timeListen: timeListenReducer,

    categories: categoryReducer,
    categoryDetail: categroryDetailReducer,

    singers: singerReducer,
    singerDetail: singerDetailReducer,

    search: searchReducer,
    auths: authReducer,

    displayPlaylist: displayListReducer,
    displayVideo: displayVideoReducer,
  },
});

export default store;
