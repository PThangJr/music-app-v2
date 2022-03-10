import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../pages/auths/authSlice';
import HeaderBottom from './components/HeaderBottom';
import HeaderTop from './components/HeaderTop';
import './styles.scss';
const Header = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const [isScroll, setIsScroll] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  // Handle window scroll

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (offsetY > window.scrollY) {
        // console.log("scrolling up", offsetY);
        setIsScroll(false);
      } else if (offsetY > 200 && offsetY < window.scrollY) {
        // console.log("scrolling down", offsetY);
        setIsScroll(true);
      }
      setOffsetY(window.scrollY);
    },
    [offsetY]
  );

  //************Initial state*********

  //***********Get data from store*****************
  const auths = useSelector((state) => state.auths);

  //************Side effect***********
  useEffect(() => {
    setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);
    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    if (!auths.isAuthenticate) {
      dispatch(authenticate());
    }
  }, [auths.isAuthenticate, dispatch]);

  //***********Handle event**************

  //***********Render UI*****************

  return (
    <header className={classNames('header', { scroll: isScroll })}>
      <div className="container-md">
        <HeaderTop />
        <HeaderBottom />
      </div>
    </header>
  );
};

export default Header;
