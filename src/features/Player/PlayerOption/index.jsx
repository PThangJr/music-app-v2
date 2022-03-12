import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayPlaylist } from '../../Playlist/displayPlaylistSlice';
import { toggleDisplayVideo } from '../../Video/displayVideoSlice';
import './styles.scss';
import useTotalSongs from '../../../hooks/useTotalSongs';

const PlayerOption = ({ volume = 100, onChangeVolume, onMute }) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********

  //************Side effect***********
  const totalSongs = useTotalSongs();
  //***********Get data from store*****************
  const { currentSong } = useSelector((state) => state.playlist);
  const displayPlaylist = useSelector((state) => state.displayPlaylist);
  const displayVideo = useSelector((state) => state.displayVideo);
  //***********Handle event**************
  const handleToggleModal = () => {
    dispatch(setDisplayPlaylist(!displayPlaylist));
  };

  const handleChangeVolume = (e) => {
    if (onChangeVolume) {
      onChangeVolume(e);
    }
  };
  const handleToggleMute = (status) => {
    if (onMute) onMute(status);
  };
  const handleToggleModalVideo = () => {
    if (currentSong?.videoId || currentSong?.karaokeId) {
      dispatch(toggleDisplayVideo());
    }
  };

  //***********Render UI*****************

  return (
    <div className="player-option">
      <div
        className={classNames('player-option-video', {
          disabled: !currentSong?.videoId && !currentSong?.karaokeId,
          active: displayVideo,
        })}
        onClick={handleToggleModalVideo}
      >
        <i className="fa-solid fa-video"></i>
      </div>
      <div className="player-option-volume">
        {Number(volume) === 0 && (
          <span onClick={() => handleToggleMute(true)}>
            <i className="fas fa-volume-mute"></i>
          </span>
        )}
        {Number(volume) !== 0 && (
          <span onClick={() => handleToggleMute(false)}>
            <i className="fas fa-volume-up"></i>
          </span>
        )}

        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          name="volume"
          className="volume"
          onChange={handleChangeVolume}
        />
      </div>
      <div className={classNames('player-option-menu', { active: displayPlaylist })} onClick={handleToggleModal}>
        <i className="fas fa-list-alt"></i>
        {totalSongs && <p className="total-songs">{totalSongs}</p>}
      </div>
    </div>
  );
};

export default PlayerOption;
