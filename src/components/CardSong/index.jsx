import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsPlaying } from '../../features/Player/PlayerControl/playerControlSlice';
import { setTimeListen } from '../../features/Player/PlayerControl/timeListenSlice';
import { addSongToSongListNext, chooseSong, setCurrentSong } from '../../features/Playlist/playlistSlice';
import { addFavoriteSong } from '../../pages/favorites/favoriteSongSlice';
import { FALL_BACK_IMAGE_SONG } from '../../utils/contanst';
import convertViews from '../../utils/convertViews';
import LazyLoadImage from '../LazyLoadImage';
import './styles.scss';
const CardSong = ({
  song = { name: '', _id: '', singers: [] },
  fullInfo = true, // If fullInfo === false. Song does not show views
  style = {},
  ranking = false, // If ranking === true. Song show index in head
  index,
  hasAvatar = true,
}) => {
  // Declaration
  const dispatch = useDispatch();

  // Get data from store
  const { isPlaying } = useSelector((state) => state.playerControls);
  const { data: favoriteSongs } = useSelector((state) => state.favoriteSongs);
  const { currentSong } = useSelector((state) => state.playlist);

  // Fallback image when link image has error

  // Check song is current song or not
  const isCurrentSong = currentSong?._id === song?._id;
  const isFavorite = favoriteSongs.find((s) => s._id === song?._id);

  //*****Handle************************ */
  // Handle when click to one song
  const handleChooseSong = () => {
    if (isCurrentSong) {
      dispatch(setIsPlaying(!isPlaying));
    } else {
      dispatch(setTimeListen(0));
      dispatch(chooseSong(song));
      dispatch(setIsPlaying(true));
      dispatch(setCurrentSong(song));
    }
  };
  //
  const handleStopropagation = (e) => {
    e.stopPropagation();
  };
  // Handle when favorite one song
  const handleAddFavorite = () => {
    dispatch(addFavoriteSong(song));
  };
  // Handle add one song to songListNext
  const handleAddNextSongToSongListNext = () => {
    dispatch(addSongToSongListNext(song));
  };
  return (
    <div className={classNames('card-song', { active: isCurrentSong })} style={style}>
      <div className="card-song-content" onClick={handleChooseSong}>
        {ranking && (
          <span
            className={classNames('card-song-content-index', {
              [`card-song-content-index--${index + 1}`]: index + 1,
            })}
          >
            {index + 1}
          </span>
        )}

        <div className="card-song-content-image">
          <LazyLoadImage
            src={song?.image?.secure_url || FALL_BACK_IMAGE_SONG}
            alt={song?.image?.public_id}
            className="card-song-content-image__img"
          />
          {!isCurrentSong && (
            <p className="icon icon--play">
              <i className="far fa-play-circle"></i>
            </p>
          )}
          {isPlaying && isCurrentSong && (
            <p className="icon icon--playing">
              <i className=""></i>
            </p>
          )}
          {!isPlaying && isCurrentSong && (
            <p className="icon icon--pause">
              <i className="far fa-pause-circle"></i>
            </p>
          )}
        </div>
        <div className="card-song-info">
          <p className="card-song-info__name">{song?.name}</p>
          <div className="card-song-info__singers">
            {song?.singers.map((singer, index) => (
              <React.Fragment key={singer?._id}>
                <Link
                  className={classNames('card-song-info__singers-link', `card-song-info__singers-link--${index}`)}
                  onClick={handleStopropagation}
                  to={`/ca-si/${singer?.slug}`}
                >
                  {index > 0 && <span> , </span>}
                  {singer?.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {fullInfo && (
        <div className="card-song-views">
          <p className="icon">
            <i className="fas fa-headphones"></i>
          </p>
          {convertViews(song?.views)}
        </div>
      )}
      {fullInfo && hasAvatar && (
        <div className="card-song-action">
          <p className={classNames('icon icon--cursor', { active: isFavorite })} onClick={handleAddFavorite}>
            <i className="fas fa-heart"></i>
          </p>
          <p className="icon icon--cursor" onClick={handleAddNextSongToSongListNext}>
            <i className="fas fa-angle-double-right"></i>
          </p>
        </div>
      )}
    </div>
  );
};

export default CardSong;
