import classNames from "classnames";
import React from "react";
import LoadingDotCircle from "../../Loading/LoadingDotCircle";
import "./styles.scss";

const ButtonLoadMore = ({
  onClick,
  center = false,
  disabled = false,
  isLoading = false,
}) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={classNames("btn btn--load-more", {
        "btn--center": center,
        "btn--disabled": isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading && <LoadingDotCircle />}
      Xem thêm ...
    </button>
  );
};

export default ButtonLoadMore;
