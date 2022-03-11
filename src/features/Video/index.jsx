import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { setIsPlaying, setIsPlayingVideo, setVideoPlay } from '../Player/PlayerControl/playerControlSlice';
import './styles.scss';
const Video = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  const [panel, setPanel] = useState('videoId');

  //************Side effect***********
  useEffect(() => {
    //Component unmount
    return () => {
      console.log('unmount');
      dispatch(setIsPlayingVideo(false));
    };
  }, [dispatch]);
  //***********Get data from store*****************
  const { currentSong } = useSelector((state) => state.playlist);
  const { isPlaying } = useSelector((state) => state.playerControls);

  //***********Handle event**************
  const handlePlayVideo = () => {
    dispatch(setIsPlayingVideo(true));
    dispatch(setVideoPlay(currentSong?.[panel]));
    if (isPlaying) {
      dispatch(setIsPlaying(false));
    }
  };
  const handlePauseVideo = () => {
    dispatch(setIsPlayingVideo(false));
  };
  const handleChangePanel = (p) => {
    setPanel(p);
  };
  const handleReadyVideo = () => {
    // console.log('ready');
  };
  const handleError = () => {
    dispatch(setIsPlayingVideo(false));
  };
  //***********Render UI*****************
  const renderVideo = () => {
    if (currentSong?.[panel]) {
      return (
        <YouTube
          opts={{ width: '100%', height: '100%' }}
          videoId={currentSong?.[panel]}
          onPlay={handlePlayVideo}
          onReady={handleReadyVideo}
          onPause={handlePauseVideo}
          onError={handleError}
          containerClassName="video-container"
        />
      );
    }
  };
  return (
    <div className="video">
      <div className="container">
        <div className="video-option">
          <div
            className={classNames('video-option__video', {
              active: panel === 'videoId',
            })}
            onClick={() => handleChangePanel('videoId')}
          >
            Video
          </div>
          <div
            className={classNames('video-option__karaoke', {
              active: panel === 'karaokeId',
            })}
            onClick={() => handleChangePanel('karaokeId')}
          >
            Karaoke
          </div>
        </div>
      </div>
      {renderVideo()}
    </div>
  );
};

export default React.memo(Video);
