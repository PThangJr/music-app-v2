import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.scss";

const LoadingDotCircle = ({ style = {}, type = "" }) => {
  return (
    <div
      className={classnames("loading-dot-circle", {
        [`loading-dot-circle--${type}`]: type,
      })}
      style={style}
    >
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

LoadingDotCircle.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
};

export default LoadingDotCircle;
