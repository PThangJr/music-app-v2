import classNames from 'classnames';
import React, { forwardRef } from 'react';
import LoadingDotCircle from '../../Loading/LoadingDotCircle';
import './styles.scss';

const ButtonLoadMore = ({ onClick, center = false, disabled = false, isLoading = false, style }, ref) => {
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={classNames('btn btn--load-more', {
        'btn--center': center,
        'btn--disabled': isLoading,
      })}
      style={style}
      disabled={isLoading}
      ref={ref}
    >
      {isLoading && <LoadingDotCircle />}
      Xem thêm ...
    </button>
  );
};

export default forwardRef(ButtonLoadMore);
