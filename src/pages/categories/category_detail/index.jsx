import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Heading from '../../../components/Heading';
import AlbumContainer from '../../../containers/AlbumContainer';
import SongContainer from '../../../containers/SongContainer';
import useAlbums from '../../../hooks/useAlbums';
import useSongs from '../../../hooks/useSongs';
import { fetchCategoryBySlug } from './categoryDetailSlice';

const CategoryDetail = () => {
  //************Declaration***********
  const { slug } = useParams();
  const dispatch = useDispatch();

  //************Initial state*********

  //************Side effect***********
  useEffect(() => {
    dispatch(fetchCategoryBySlug(slug));
  }, [dispatch, slug]);

  const songsOfCategory = useSongs({
    subUrl: `/category/${slug}`,
    params: { limit: 20 },
  });

  const albumsOfCategory = useAlbums({
    subUrl: `/category/${slug}`,
    params: { limit: 10 },
  });
  //***********Get data from store*****************
  const categoryDetail = useSelector((state) => state.categoryDetail);
  //***********Handle event**************

  //***********Render UI*****************

  return (
    <div className="category-detail-page">
      <Heading headingText={categoryDetail?.data?.name} />
      <div className="row">
        <div className="col-xl-9">
          <SongContainer
            songs={songsOfCategory.data}
            loading={{ isLoading: songsOfCategory.isLoading, totalItems: 6 }}
            headingText="Bài hát"
          />
        </div>
        <div className="col-xl-3">
          <AlbumContainer
            albums={albumsOfCategory.data}
            loading={{ isLoading: albumsOfCategory.isLoading, totalItems: 6 }}
            col={{ xl: 6, lg: '2_4', md: '2_4', sm: 3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
