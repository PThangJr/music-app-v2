import React from 'react';
import { useSelector } from 'react-redux';
import SongContainer from '../../containers/SongContainer';
import './styles.scss';
const FavoritesPage = () => {
  const favoriteSongs = useSelector((state) => state.favoriteSongs);
  const favoriteSongsSorted = [...favoriteSongs.data].sort((x, y) => y.views - x.views);
  // console.log(favoriteSongsSorted);
  return (
    <div className="favorite-song-page">
      <SongContainer headingText="Bài hát yêu thích" songs={favoriteSongsSorted} />
    </div>
  );
};

export default FavoritesPage;
