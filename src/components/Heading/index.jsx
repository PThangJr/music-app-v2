import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Heading = ({ headingText = '', children, linkUrl = '', textAlign = 'left', className, style = {} }) => {
  const renderHeading = () => {
    if (linkUrl) {
      return (
        <>
          <Link
            className={classNames('heading-link', { [className]: className })}
            style={{ ...style, textAlign }}
            to={linkUrl}
          >
            <i className="fa-solid fa-bolt"></i>
            {headingText}
            {/* <i className="fa-solid fa-angles-right"></i> */}
          </Link>
          {children}
        </>
      );
    } else {
      return (
        <h3 className={classNames('heading-text', { [className]: className })} style={{ ...style, textAlign }}>
          {headingText}
        </h3>
      );
    }
  };
  return (
    <div className="heading">
      {renderHeading()}
      {children}
    </div>
  );
};

export default Heading;
