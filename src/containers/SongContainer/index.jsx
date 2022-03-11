import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import CardSong from '../../components/CardSong';
import CardSongSkeletons from '../../components/CardSong/CardSongSkeletons';
import Heading from '../../components/Heading';
import { setIsPlaying } from '../../features/Player/PlayerControl/playerControlSlice';
import { playAllSongs } from '../../features/Playlist/playlistSlice';
import './styles.scss';
const SongContainer = (props) => {
  const {
    songs = [],
    linkUrl = '',
    headingText = '',
    loading = { isLoading: false, totalItems: 1 },
    children,
    hasHeader = true,
    ranking = false,
    // btnPlayAll = true,
    showHeadingWhenNoSong = true,
    hasAvatar = true,
  } = props;
  const dispatch = useDispatch();
  const handlePlayAllSongs = () => {
    if (songs.length) {
      dispatch(playAllSongs(songs));
      dispatch(setIsPlaying(true));
    }
  };
  const renderHeader = () => {
    if (hasHeader) {
      return (
        <header className="song-container-header">
          <Heading linkUrl={linkUrl} headingText={headingText} />
          <Button className="btn--green btn--play-all" btnSmall onClick={handlePlayAllSongs}>
            Phát tất cả
            <i className="fa-solid fa-play"></i>
          </Button>
        </header>
      );
    }
  };

  const renderSongs = () => {
    if (loading.isLoading) {
      return (
        <>
          {hasHeader && (
            <header className="song-container-header">
              <h3 className="song-container-header__heading">Loading...</h3>
            </header>
          )}
          <div className="song-container__main">
            <CardSongSkeletons totalItems={loading.totalItems} />
          </div>
        </>
      );
    } else {
      if (songs.length > 0) {
        return (
          <>
            {renderHeader()}
            <div className="song-container__main">
              {songs.map((song, index) => (
                <CardSong
                  hasAvatar={hasAvatar}
                  key={`${headingText}-${song._id}`}
                  ranking={ranking}
                  index={index}
                  song={song}
                />
              ))}
            </div>
            {children}
          </>
        );
      } else {
        if (hasHeader && showHeadingWhenNoSong) return <Heading headingText="Không có bài hát nào" />;
      }
    }
  };

  // const handleClick = () => {
  //   if (typeof onPlayAllSongList === 'function') {
  //     onPlayAllSongList();
  //   }
  // };

  return <div className="song-container">{renderSongs()}</div>;
};

export default SongContainer;
