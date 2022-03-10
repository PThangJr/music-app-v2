import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import CardSong from '../../components/CardSong';
import CardSongSkeletons from '../../components/CardSong/CardSongSkeletons';
import Heading from '../../components/Heading';
import { removeSongListNext, removeSongListPrev, sortPlaylist } from './playlistSlice';
import './styles.scss';
const Playlist = ({ className }) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);
  const { isPlaying } = useSelector((state) => state.playerControls);

  // console.log(playlist);

  const { songListPrev = [], songListNext = [], isLoading } = playlist;
  // console.log(songsOfRanking);
  // {...provided?.dragHandleProps}
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    //
    dispatch(sortPlaylist({ source, destination }));
  };
  const handleRemoveSongListPrev = () => {
    if (songListPrev.length === 1 && isPlaying) {
    } else {
      if (window.confirm('Bạn có muốn xoá danh sách đã phát không?')) {
        dispatch(removeSongListPrev(isPlaying));
      }
    }
  };
  const handleRemoveSongListNext = () => {
    if (window.confirm('Bạn có muốn xoá danh sách tiếp theo?')) {
      dispatch(removeSongListNext());
    }
  };
  const renderSongList = (songList) => {
    if (isLoading) {
      return <CardSongSkeletons totalItems={5} />;
    } else {
      return (
        songList.length > 0 &&
        songList.map((song, index) => (
          <Draggable key={'playlist-' + song._id} index={index} draggableId={song._id}>
            {(provided, snapshot) => (
              <li
                className="song-item"
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? '0.5' : '1',
                  // top: "auto !important",
                  left: 'auto !important',
                  // right: "auto !important",
                }}
              >
                <CardSong fullInfo={false} song={song} />
                <p className="icon">
                  <i className="fas fa-align-right"></i>
                </p>
              </li>
            )}
          </Draggable>
        ))
      );
    }
  };

  return (
    <div className={'playlist ' + className}>
      <Heading className="playlist__heading" textAlign="center">
        Danh sách phát
      </Heading>
      <div className="playlist-main">
        <div className="playlist-list">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="songListPrev">
              {(provided) => (
                <ul className="song-list song-list--prev" {...provided.droppableProps} ref={provided.innerRef}>
                  {songListPrev.length > 0 && (
                    <header className="song-list-header">
                      <h4 className="song-list-header__heading">Bài hát đã phát</h4>
                      <p className="song-list-header__delete" onClick={handleRemoveSongListPrev}>
                        Xoá tất cả
                      </p>
                    </header>
                  )}
                  {renderSongList(songListPrev)}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <Droppable droppableId="songListNext">
              {(provided) => (
                <ul className="song-list song-list--next" {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    <header className="song-list-header">
                      <h4 className="song-list-header__heading">Bài hát tiếp theo</h4>
                      <p className="song-list-header__delete" onClick={handleRemoveSongListNext}>
                        Xoá tất cả
                      </p>
                    </header>
                  }

                  {renderSongList(songListNext)}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
