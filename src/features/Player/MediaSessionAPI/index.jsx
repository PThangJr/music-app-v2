import React from 'react';

import MediaSession from '@mebtte/react-media-session';
import { useSelector } from 'react-redux';

const MediaSessionAPI = (props) => {
  const { handlePlaySong, handlePauseSong, handleNextSong, handlePrevSong } = props;
  const { currentSong } = useSelector((state) => state.playlist);
  // console.log('renderSingers');
  console.log(currentSong);
  const renderSingerName = () => {
    if (currentSong?.singers?.length) {
      const result = currentSong.singers.map((singer) => singer.name).join(' ft ');
      return result;
    } else {
      return 'Đang cập nhật...';
    }
  };

  return (
    <MediaSession
      title={currentSong?.name || 'Bài hát'}
      artist={renderSingerName()}
      album={'Website design by PThangJr'}
      artwork={[
        {
          src:
            currentSong?.image?.secure_url ||
            'https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png',
          // sizes: '256x256,384x384,512x512',
          // type: 'image/jpg',
        },
      ]}
      onPlay={handlePlaySong}
      onPause={handlePauseSong}
      // // // onSeekBackward={onBackward10s}
      // // // onSeekForward={onForward10s}
      onPreviousTrack={handlePrevSong}
      onNextTrack={handleNextSong}
    />
  );
};

export default React.memo(MediaSessionAPI);
