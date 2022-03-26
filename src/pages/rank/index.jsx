import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ButtonLoadMore from '../../components/Button/ButtonLoadMore';
import AlbumContainer from '../../containers/AlbumContainer';
import CategoryContainer from '../../containers/CategoryContainer';
import SongContainer from '../../containers/SongContainer';
import useAlbums from '../../hooks/useAlbums';
import useCategories from '../../hooks/useCategories';
import useSongsOfRanking from '../../hooks/useSongsOfRanking';
import { fetchMoreSongsOfRanking } from './songOfRankingSlice';
import './styles.scss';
const RankPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const location = useLocation();
  const { limit } = queryString.parse(location.search, { parseNumbers: true });
  const btnLoadMoreRef = useRef();
  //************Initial state*********
  const [page, setPage] = useState(1);

  //************Side effect***********
  const songsOfRanking = useSongsOfRanking({
    params: {
      sort: '-views slug',
      limit: limit || 10,
    },
  });

  const categories = useCategories({ params: { limit: 12 } });
  const albums = useAlbums({ params: { limit: 8 } });
  useEffect(() => {
    const btnLoadMore = btnLoadMoreRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevState) => {
          if (prevState < 10) {
            return prevState + 1;
          }
          return prevState;
        });
      }
    });
    if (btnLoadMore) {
      observer.observe(btnLoadMore);
    }
    return () => {
      if (btnLoadMore) {
        observer.unobserve(btnLoadMore);
      }
    };
  }, []);
  useEffect(() => {
    if (page > 1 && page <= songsOfRanking.totalPages) {
      dispatch(fetchMoreSongsOfRanking({ params: { sort: '-views slug', limit: 10, page } }));
    }
  }, [dispatch, page, songsOfRanking.totalPages]);
  //***********Get data from store*****************
  //***********Handle event**************
  const handleSetTotalItems = () => {
    if (page <= songsOfRanking.totalPages) {
      // dispatch(fetchMoreSongsOfRanking({ params: { sort: '-views slug', limit: 10, page } }));
      setPage((prevState) => prevState + 1);
    }
  };

  // console.log(page, songsOfRanking.totalPages);
  //***********Render UI*****************

  return (
    <div className="rank-page">
      <div className="row">
        <div className="col-xl-9">
          <SongContainer
            songs={songsOfRanking.data}
            loading={{ isLoading: songsOfRanking.isLoading, totalItems: 20 }}
            headingText="Bảng xếp hạng"
            ranking
          />
          {songsOfRanking.data.length < 100 && (
            <ButtonLoadMore
              isLoading={songsOfRanking.isLoadingMore}
              onClick={handleSetTotalItems}
              center
              ref={btnLoadMoreRef}
              disabled={page >= songsOfRanking.totalPages}
              style={{ marginTop: '50px' }}
              // style={{ display: page >= songsOfRanking.totalPages ? 'none' : '' }}
            ></ButtonLoadMore>
          )}
        </div>
        <div className="col-xl-3">
          <CategoryContainer
            headingText="Thể loại gợi ý"
            loading={{ isLoading: categories.isLoading, totalItems: 10 }}
            categories={categories.data}
            // cols={{ xl: 2, lg: 6, md: 4, sm: 3, xs: 2 }}
            col={{ xl: 6, lg: '2_4', md: 3, sm: 3, xs: 2 }}
          />
          <AlbumContainer
            albums={albums.data}
            headingText="Album gợi ý"
            loading={{ isLoading: albums.isLoading, totalItems: 8 }}
            col={{ xl: 6, lg: '2_4', md: 3, sm: 3, xs: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RankPage;
