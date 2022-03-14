import React, { useEffect, useRef } from 'react';
import './styles.scss';
const LazyLoadImage = ({ className, src, alt }) => {
  const imageRef = useRef();

  useEffect(() => {
    const image = imageRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        image.src = src;
        image.classList.add('active');
      }
    });
    if (image) {
      observer.observe(image);
    }
    return () => {
      if (image) {
        observer.unobserve(image);
      }
    };
  }, [src]);

  return <img alt={alt} className={`${className} lazy-load-image`} ref={imageRef} />;
};

export default LazyLoadImage;
