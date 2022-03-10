import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
const CardSongSkeletons = (props) => {
  const { totalItems = 0 } = props;
  const arr = [];
  for (let i = 0; i < totalItems; i++) {
    arr.push(i);
  }
  return (
    <div className="card-song-skeletons">
      {arr.map((item) => {
        return (
          <div key={item + "-song"} className="card-song-skeletons-item"></div>
        );
      })}
    </div>
  );
};

CardSongSkeletons.propTypes = {
  totalItems: PropTypes.number,
};

export default CardSongSkeletons;
