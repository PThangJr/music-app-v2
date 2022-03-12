import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsPlayingVideo } from '../../features/Player/PlayerControl/playerControlSlice';
import { fetchSongsOfAlbum } from '../../features/Playlist/playlistSlice';
import './styles.scss';
const CardAlbum = ({ album }) => {
  // Declaration
  const dispatch = useDispatch();

  // Get songs of albums and push them to Playlist
  const handleAddSongsToPlaylist = () => {
    dispatch(fetchSongsOfAlbum({ params: { albums: album._id } }));
    dispatch(setIsPlayingVideo(false));
  };

  // ********** Render **********************
  const renderSingers = () => {
    return album?.singers.map((singer, index) => (
      <React.Fragment key={singer?._id}>
        {index > 0 && <span> , </span>}
        <Link to={`/ca-si/${singer?.slug}`}> {singer?.name}</Link>
      </React.Fragment>
    ));
  };
  return (
    <div className="album-card">
      <div className="album-card-image">
        <img src={album?.image?.secure_url || ''} alt="" className="album-card-image__img" />
        <div className="album-card-image__overlay">
          <p className="icon icon--play" onClick={handleAddSongsToPlaylist}>
            <i className="far fa-play-circle"></i>
          </p>
        </div>
      </div>
      <Link to={`/albums/${album?.slug}`} className="album-card-name">
        {album?.name}
      </Link>
      <div className="album-card-singers">{renderSingers()}</div>
    </div>
  );
};

export default CardAlbum;
