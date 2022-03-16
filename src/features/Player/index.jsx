import React, { useRef, useState } from 'react';
import PlayerControl from './PlayerControl';
import PlayerInfo from './PlayerInfo';
import PlayerOption from './PlayerOption';
import './styles.scss';
const Player = () => {
  const [volume, setVolume] = useState(100);
  const volumeRef = useRef(0);
  const handleChangeValueVolume = (e) => {
    setVolume(Number(e.target.value));
  };
  const handleToggleMute = (status) => {
    // console.log(status);
    if (!status) {
      volumeRef.current = Number(volume);
      setVolume(0);
    } else {
      if (volumeRef.current === 0) {
        setVolume(100);
      } else {
        setVolume(volumeRef.current);
      }
    }
  };
  return (
    <div className="player">
      <div className="container">
        <PlayerInfo />
        <PlayerControl volume={volume} />
        <PlayerOption onChangeVolume={handleChangeValueVolume} volume={volume} onMute={handleToggleMute} />
      </div>
    </div>
  );
};

export default Player;
