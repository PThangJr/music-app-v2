import queryString from 'query-string';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ButtonLoadMore from '../../components/Button/ButtonLoadMore';
import CategoryContainer from '../../containers/CategoryContainer';
import SongContainer from '../../containers/SongContainer';
import useCategories from '../../hooks/useCategories';
import useSongsOfRanking from '../../hooks/useSongsOfRanking';
import { fetchMoreSongsOfRanking } from './songOfRankingSlice';
import './styles.scss';
const RankPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const location = useLocation();
  const { limit } = queryString.parse(location.search, { parseNumbers: true });
  const songsOfRanking = useSongsOfRanking({
    params: {
      sort: '-views slug',
      limit: limit || 20,
    },
  });
  const categories = useCategories({ params: { limit: 12 } });
  const handleSetTotalItems = () => {
    if (songsOfRanking.data.length < 100) {
      dispatch(fetchMoreSongsOfRanking({ params: { sort: '-views slug', limit: 20, page } }));
    }
    setPage(page + 1);
  };

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
          {categories.data?.length && page <= songsOfRanking?.totalPages && (
            <ButtonLoadMore isLoading={songsOfRanking.isLoading} onClick={handleSetTotalItems} center></ButtonLoadMore>
          )}
        </div>
        <div className="col-xl-3">
          <CategoryContainer
            headingText="Thể loại gợi ý"
            loading={{ isLoading: categories.isLoading, totalItems: 10 }}
            categories={categories.data}
            cols={{ xl: 2, lg: 6, md: 4, sm: 3, xs: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RankPage;
