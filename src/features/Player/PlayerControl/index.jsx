import classNames from 'classnames';
import { saveAs } from 'file-saver';
import formatDuration from 'format-duration';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteSong } from '../../../pages/favorites/favoriteSongSlice';
import { fetchUpdateViewsOfSong } from '../../../pages/songs/songSlice';
import { TIME_LISTEN_TO_UP_VIEWS } from '../../../utils/contanst';
import { nextSong, prevSong, randomSongListNext } from '../../Playlist/playlistSlice';
import MediaSessionAPI from '../MediaSessionAPI';
import { setIsPlaying, setIsPlayingVideo, setIsRandom, setIsRepeat } from './playerControlSlice';
import './styles.scss';
import { setTimeListen } from './timeListenSlice';

const PlayerControl = ({ volume }) => {
  const dispatch = useDispatch();
  // Get data from store
  const { currentSong } = useSelector((state) => state.playlist);
  const favoriteSongs = useSelector((state) => state.favoriteSongs) || {
    data: [{ _id: '' }],
  };
  const { songListNext, songListPrev } = useSelector((state) => state.playlist);
  const isFavoriteSong = favoriteSongs.data.find((s) => s._id === currentSong._id);
  const { isPlaying, isRepeat, isRandom, isPlayingVideo } = useSelector((state) => state.playerControls);
  const timeListen = useSelector((state) => state.timeListen);

  const hasCurrentSong = currentSong?.audio?.secure_url;
  // InitState
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // const [timeListen, setTimeListen] = useState(0);

  const audioRef = useRef();
  const debounceRef = useRef();
  // console.log(currentSong);

  //Duration song

  useEffect(() => {
    if (audioRef) {
      if (currentSong?.audio?.secure_url) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      } else {
        setCurrentTime(0);
        setDuration(0);
      }
    }
  }, [isPlaying, currentSong, currentTime, dispatch]);

  //Handle stop handle refresh page when music is playing
  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    if (isPlaying) {
      window.addEventListener('beforeunload', onUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef) return;
    audioRef.current.volume = volume ? volume / 100 : volume;
  }, [volume]);
  // When timeListen > 60. Update views for song
  useEffect(() => {
    if (timeListen === TIME_LISTEN_TO_UP_VIEWS) {
      dispatch(
        fetchUpdateViewsOfSong({
          id: currentSong?._id,
        })
      );
    }
  }, [currentSong?._id, dispatch, timeListen]);

  // Set time listen
  const timeListenRef = useRef();
  useEffect(() => {
    if (isPlaying) {
      timeListenRef.current = setTimeout(() => {
        dispatch(setTimeListen());
      }, 1000);
    }
    return () => {
      clearTimeout(timeListenRef.current);
    };
  }, [dispatch, isPlaying, timeListen]);

  const handlePauseSong = useCallback(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch]);
  const handlePlaySong = useCallback(() => {
    if (hasCurrentSong && !isPlayingVideo) {
      dispatch(setIsPlaying(true));
    }
  }, [dispatch, hasCurrentSong, isPlayingVideo]);
  const handleSeekSong = (e) => {
    if (!currentSong._id) return;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    dispatch(setIsPlaying(false));
    const currentTime = (duration / 100) * e.target.value;
    setCurrentTime(currentTime);

    debounceRef.current = setTimeout(() => {
      dispatch(setIsPlaying(true));
      audioRef.current.currentTime = currentTime;
    }, 300);
  };
  const handleRepeatSong = () => {
    dispatch(setIsRepeat(!isRepeat));
  };
  // Handle audio
  const handleTimeUpdate = (e) => {
    if (isPlaying) {
      setCurrentTime(e.target.currentTime);
    }
  };
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };
  const handleEndedData = () => {
    if (isRepeat) {
      audioRef.current.loop = true;
      if (timeListen >= TIME_LISTEN_TO_UP_VIEWS) {
        dispatch(setTimeListen(0));
      }
    } else {
      dispatch(setTimeListen(0));
      if (
        (songListNext.length > 0 && currentSong._id !== songListNext[songListNext.length - 1]._id) ||
        currentSong._id !== songListPrev[songListPrev.length - 1]._id
      ) {
        dispatch(setIsPlaying(true));
        dispatch(nextSong());
      } else {
        dispatch(setIsPlaying(false));
      }
    }
  };
  const handleNextSong = useCallback(() => {
    if (
      (songListNext.length > 0 && currentSong._id !== songListNext[songListNext.length - 1]._id) ||
      currentSong._id !== songListPrev[songListPrev.length - 1]._id
    ) {
      dispatch(setIsPlayingVideo(false));
      dispatch(setTimeListen(0));
      dispatch(setIsPlaying(true));
      dispatch(nextSong());
    }
  }, [currentSong._id, dispatch, songListNext, songListPrev]);
  const handlePrevSong = useCallback(() => {
    if (!(currentSong._id === songListPrev[0]._id)) {
      dispatch(setIsPlayingVideo(false));
      dispatch(setTimeListen(0));
      dispatch(setIsPlaying(true));
      dispatch(prevSong());
    }
  }, [currentSong._id, dispatch, songListPrev]);
  const handleRandomSongs = () => {
    if (!isRandom) {
      // dispatch(randomSongListNext());
      dispatch(randomSongListNext());
    }
    dispatch(setIsRandom(!isRandom));
  };
  const handleFavoriteSong = () => {
    if (hasCurrentSong) {
      dispatch(addFavoriteSong(currentSong));
    }
  };
  const handleDownloadSong = useCallback(() => {
    if (currentSong?.audio?.secure_url) {
      const singerNames = currentSong.singers
        .reduce((acc, cur, index) => {
          if (index > 0) {
            return `${acc} ft ${cur.name}`;
          }
          return `${acc} ${cur.name}`;
        }, '')
        .replaceAll('.', '');
      saveAs(currentSong.audio.secure_url, `${currentSong.name} - ${singerNames}`);
    }
  }, [currentSong?.audio?.secure_url, currentSong?.name, currentSong?.singers]);

  return (
    <div className="player-control">
      {/* Media session */}
      <MediaSessionAPI
        handlePlaySong={handlePlaySong}
        handlePauseSong={handlePauseSong}
        handleNextSong={handleNextSong}
        handlePrevSong={handlePrevSong}
      />
      <div className="player-control-action">
        <button
          disabled={!hasCurrentSong}
          className={classNames('btn btn--heart', { active: isFavoriteSong, 'btn--disabled': !hasCurrentSong })}
          onClick={handleFavoriteSong}
        >
          <i className="fas fa-heart"></i>
        </button>
        <button
          disabled={!hasCurrentSong}
          className={classNames('btn btn--random', { active: isRandom, 'btn--disabled': !hasCurrentSong })}
          onClick={handleRandomSongs}
        >
          <i className="fas fa-random"></i>
        </button>
        <button
          disabled={!hasCurrentSong}
          className={classNames('btn btn--prev', {
            'btn--disabled': !hasCurrentSong || songListPrev?.[0]?._id === currentSong?._id,
          })}
          onClick={handlePrevSong}
        >
          <i className="fas fa-step-backward"></i>
        </button>
        {isPlaying ? (
          <button className="btn btn--pause" onClick={handlePauseSong}>
            <i className="far fa-pause-circle"></i>
          </button>
        ) : (
          <button
            disabled={!hasCurrentSong}
            className={classNames('btn btn--play', { 'btn--disabled': !hasCurrentSong })}
            onClick={handlePlaySong}
          >
            <i className="far fa-play-circle"></i>
          </button>
        )}

        <button
          disabled={!hasCurrentSong}
          className={classNames('btn btn--next', { 'btn--disabled': !hasCurrentSong || songListNext?.length === 0 })}
          onClick={handleNextSong}
        >
          <i className="fas fa-step-forward"></i>
        </button>
        <button className={classNames('btn btn--repeat', { active: isRepeat })} onClick={handleRepeatSong}>
          <i className="fas fa-redo-alt"></i>
        </button>
        {/* {currentSong?.audio?.secure_url ? (
          <a href={currentSong?.audio?.secure_url} target="_blank" className="btn btn--download" rel="noreferrer">
            <i className="fas fa-download"></i>
          </a>
        ) : (
        )} */}
        <button
          disabled={!hasCurrentSong}
          onClick={handleDownloadSong}
          className={classNames('btn btn--download', { 'btn--disabled': !hasCurrentSong })}
        >
          <i className="fas fa-download"></i>
        </button>
      </div>
      <div className="player-control-progress">
        <button
          disabled={!hasCurrentSong}
          className={classNames('btn btn--heart', { active: isFavoriteSong, 'btn--disabled': !hasCurrentSong })}
          onClick={handleFavoriteSong}
        >
          <i className="fas fa-heart"></i>
        </button>
        <span className="player-control-progress__time player-control-progress__time--start ">
          {formatDuration(currentTime * 1000)}
        </span>
        <input
          type="range"
          id="progress"
          value={(currentTime / duration) * 100 || 0}
          name="progress"
          min="0"
          max="100"
          className="player-control-progress__range"
          onChange={handleSeekSong}
          // onMouseDown={() => console.log('mouse down')}
          // onMouseUp={() => console.log('mouse up')}
        />
        <span className="player-control-progress__time player-control-progress__time--end">
          {formatDuration(duration * 1000)}
        </span>
        {/* {currentSong?.audio?.secure_url ? (
          <a href={currentSong?.audio?.secure_url} target="_blank" className="btn btn--download" rel="noreferrer">
            <i className="fas fa-download"></i>
          </a>
        ) : (
        )} */}
        <button
          disabled={!hasCurrentSong}
          onClick={handleDownloadSong}
          className={classNames('btn btn--download', { 'btn--disabled': !hasCurrentSong })}
        >
          <i className="fas fa-download"></i>
        </button>
        <audio
          controls
          className="d-none"
          ref={audioRef}
          src={currentSong?.audio?.secure_url || ''}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onEnded={handleEndedData}
        ></audio>
      </div>
    </div>
  );
};

export default PlayerControl;
