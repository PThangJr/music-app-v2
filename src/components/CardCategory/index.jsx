import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './styles.scss';
import LazyLoadImage from '../LazyLoadImage';
const CardCategory = (props) => {
  // Declaration
  const { category, textSize = '' } = props;

  return (
    <Link to={`/the-loai/${category?.slug}`} className="card-category">
      <div className="card-category-image">
        <LazyLoadImage
          src={category?.image?.secure_url}
          alt={category?.image?.public_id}
          className="card-category-image__img"
        />
        {/* <img
          src={
            category?.image?.secure_url ||
            "https://i1.sndcdn.com/artworks-000387102789-k6i8bi-t500x500.jpg"
          }
          alt=""
          className="card-category-image__img"
        /> */}
      </div>
      <div
        className={classnames('card-category-name', {
          [`card-category-name--${textSize}`]: textSize,
        })}
      >
        {category?.name}
      </div>
    </Link>
  );
};

CardCategory.propTypes = {
  category: PropTypes.object,
};

export default CardCategory;
