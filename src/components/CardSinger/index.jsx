import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';
import classnames from 'classnames';
import LazyLoadImage from '../LazyLoadImage';
const CardSinger = (props) => {
  // Fallback image when link image has error
  // Destructoring props
  const {
    singer = {
      name: '',
      linkImage: '',
      slug: '',
    },
    circle = false,
  } = props;
  return (
    <div className={classnames('card-singer', { 'card-singer--circle': circle })}>
      <Link to={`/ca-si/${singer.slug}`} className="card-singer-link">
        <div className="card-singer-link-image">
          <LazyLoadImage
            src={singer.avatar?.secure_url}
            alt={singer.avatar?.public_id}
            className="card-singer-link-image__img"
          />
        </div>
        {/* <img
          src={singer.avatar?.secure_url || ""}
          alt=""
          className="card-singer-link__img"
        /> */}
        <h4 className="card-singer-link__name">{singer.name}</h4>
      </Link>
    </div>
  );
};

CardSinger.propTypes = {
  singer: PropTypes.object,
};

export default CardSinger;
