import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Heading from '../../../components/Heading';
import Pagination from '../../../components/Pagination';
import AlbumContainer from '../../../containers/AlbumContainer';
import SongContainer from '../../../containers/SongContainer';
import useAlbums from '../../../hooks/useAlbums';
import useSongs from '../../../hooks/useSongs';
import { fetchCategoryBySlug } from './categoryDetailSlice';
import queryString from 'query-string';

const CategoryDetail = () => {
  //************Declaration***********
  const { slug } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { limit, page } = queryString.parse(location.search, { parseNumbers: true });

  //************Initial state*********

  //************Side effect***********
  useEffect(() => {
    dispatch(fetchCategoryBySlug(slug));
  }, [dispatch, slug]);

  const songsOfCategory = useSongs({
    subUrl: `/category/${slug}`,
    params: { limit: limit || 20, page: page || 1 },
  });

  const albumsOfCategory = useAlbums({
    subUrl: `/category/${slug}`,
    params: { limit: 12 },
  });
  //***********Get data from store*****************
  const categoryDetail = useSelector((state) => state.categoryDetail);
  //***********Handle event**************

  //***********Render UI*****************
  return (
    <div className="category-detail-page">
      <Heading headingText={`Thể loại : ${categoryDetail?.data?.name}`} textAlign="center" />
      <div className="row">
        <div className="col-xl-9">
          <SongContainer
            songs={songsOfCategory.data}
            loading={{ isLoading: songsOfCategory.isLoading, totalItems: 12 }}
            headingText="Bài hát"
          />
          {songsOfCategory.data.length > 0 && (
            <Pagination currentPage={page} pageRangeDisplay={5} totalPages={songsOfCategory.totalPages} />
          )}
        </div>
        <div className="col-xl-3">
          <AlbumContainer
            headingText="Albums"
            albums={albumsOfCategory.data}
            loading={{ isLoading: albumsOfCategory.isLoading, totalItems: 12 }}
            col={{ xl: 6, lg: '2_4', md: '2_4', sm: 3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
