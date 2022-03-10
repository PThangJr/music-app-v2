import React, { useRef, useState } from "react";
import PlayerControl from "./PlayerControl";
import PlayerInfo from "./PlayerInfo";
import PlayerOption from "./PlayerOption";
import "./styles.scss";
const Player = () => {
  const [volume, setVolume] = useState(100);
  const volumeRef = useRef();
  const handleChangeValueVolume = (e) => {
    setVolume(e.target.value);
  };
  const handleToggleMute = (status) => {
    if (!status) {
      volumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(volumeRef.current);
    }
  };
  return (
    <div className="player">
      <div className="container">
        <PlayerInfo />
        <PlayerControl volume={volume} />
        <PlayerOption
          onChangeVolume={handleChangeValueVolume}
          volume={volume}
          onMute={handleToggleMute}
        />
      </div>
    </div>
  );
};

export default Player;
