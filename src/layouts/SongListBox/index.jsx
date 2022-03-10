import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import "./styles.scss";

const SongListBox = ({
  linkUrl = "",
  headingText = "",
  children,
  onPlayAllSongList,
}) => {
  const handleClick = () => {
    if (typeof onPlayAllSongList === "function") {
      onPlayAllSongList();
    }
  };
  return (
    <div className="song-list-box">
      <header className="song-list-box-header">
        {linkUrl ? (
          <Link to={linkUrl} className="song-list-box-header__heading">
            {headingText}
            <i className="fa-solid fa-angles-right"></i>
          </Link>
        ) : (
          <h3 className="song-list-box-header__heading">{headingText}</h3>
        )}
        <Button
          onClick={handleClick}
          className="btn--green btn--play-all"
          btnSmall
        >
          Phát tất cả
          <i className="fa-solid fa-play"></i>
        </Button>
      </header>
      <div className="song-list-box__main">{children}</div>
    </div>
  );
};

export default SongListBox;
