import queryString from 'query-string';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setDisplayPlaylist } from '../../../../features/Playlist/displayPlaylistSlice';
import useTotalSongs from '../../../../hooks/useTotalSongs';
import { logout } from '../../../../pages/auths/authSlice';
import Button from '../../../Button';
import InputField from '../../../Form/FormField/InputField';
import LazyLoadImage from '../../../LazyLoadImage';
import ModalSidebar from '../../../ModalSidebar';
import Sidebar from '../../../Sidebar';
import './styles.scss';
const HeaderTop = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(null);
  const [keyword, setKeyword] = useState('');

  //************Initial state*********

  //************Side effect***********
  const totalSongs = useTotalSongs();
  //***********Get data from store*****************
  const { isAuthenticate, user } = useSelector((state) => state.auths);

  //***********Handle event**************
  const handleShowSidebar = () => {
    setIsOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };
  const handleChangeInput = (data) => {
    setKeyword(data.search);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const queryStringify = queryString.stringify({ keyword });
      navigate(`/search?${queryStringify}`);
    }
  };
  const handleFocus = (e) => {
    e.target.select();
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleShowPlaylist = () => {
    dispatch(setDisplayPlaylist(true));
  };

  //***********Render UI*****************
  const renderTopRight = () => {
    if (isAuthenticate) {
      return (
        <div className="user">
          <img src={user?.avatar?.secure_url} alt="" className="user__img" />
          <p className="user__name">{user?.username}</p>
          <div className="user-option">
            <p className="logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Đăng xuất
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="account-link-list">
          <NavLink
            className={({ isActive }) => (isActive ? 'account-link-item active' : 'account-link-item')}
            to="/auths/login"
          >
            Login
          </NavLink>
          <span> / </span>
          <NavLink
            className={({ isActive }) => (isActive ? 'account-link-item active' : 'account-link-item')}
            to="/auths/register"
          >
            Register
          </NavLink>
        </div>
      );
    }
  };
  return (
    <div className="header-top">
      <ModalSidebar isOpen={isOpen} onClose={handleCloseSidebar}>
        <Sidebar onClose={handleCloseSidebar} />
      </ModalSidebar>
      <div className="header-top-left">
        <a href="/" className="logo">
          <LazyLoadImage
            className="logo__img"
            alt="logo"
            src="https://creativedesign.rs/cd_app/public/images/products/3313002426527403.jpg"
          />
        </a>
        <div className="mb-icon mb-menu" onClick={handleShowSidebar}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <form className="search" onSubmit={handleSearch}>
        <InputField
          name="search"
          id="search"
          placeholder="Nhập từ khoá tìm kiếm..."
          fullWidth
          className="search-input"
          onChange={handleChangeInput}
          onFocus={handleFocus}
        />
        <Button type="submit" className="btn--green btn--search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
        </Button>
      </form>
      <div className="header-top-right">
        <div className="account">{renderTopRight()}</div>
        <div className="mb-icon mb-playlist" onClick={handleShowPlaylist}>
          <i className="fa-solid fa-music"></i>
          {totalSongs && <p className="mb-playlist-length">{totalSongs}</p>}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
