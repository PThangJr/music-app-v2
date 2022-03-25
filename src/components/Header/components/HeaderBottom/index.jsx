import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleDisplayVideo } from '../../../../features/Video/displayVideoSlice';
import './styles.scss';
const HeaderBottom = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********

  //************Side effect***********

  //***********Get data from store*****************
  const { currentSong } = useSelector((state) => state.playlist);

  //***********Handle event**************
  const handleToggleVideo = () => {
    if (currentSong?.videoId || currentSong?.karaokeId) {
      dispatch(toggleDisplayVideo());
    }
  };

  //***********Render UI*****************
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="header-bottom">
      <ul className="navbar">
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/">
            Trang chủ
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/bang-xep-hang">
            Bảng xếp hạng
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/bai-hat">
            Bài hát
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/the-loai">
            Thể loại
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/ca-si">
            Ca sĩ
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/albums">
            Albums
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink onClick={handleScrollToTop} className="navbar-item__link" to="/favorites">
            Favorites
          </NavLink>
        </li>
      </ul>
      {currentSong?._id && (
        <div className="current-song" onClick={handleToggleVideo}>
          <p className="current-song__name">{currentSong?.name}</p>
          <span>-</span>
          {currentSong?.singers?.map((singer, index) => (
            <p key={singer?._id}>
              {index > 0 && <span>ft</span>}
              {singer?.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
