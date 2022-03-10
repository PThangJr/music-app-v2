import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonLoadMore from "../../components/Button/ButtonLoadMore";
import CategoryContainer from "../../containers/CategoryContainer";
import SongContainer from "../../containers/SongContainer";
import useCategories from "../../hooks/useCategories";
import useSongs from "../../hooks/useSongs";
import queryString from "query-string";
import "./styles.scss";
const RankPage = () => {
  const [totalItems, setTotalItems] = useState(10);
  const location = useLocation();
  const { limit } = queryString.parse(location.search, { parseNumbers: true });
  const songsOfRanking = useSongs({
    params: {
      limit: limit <= 100 && limit > 0 ? limit : totalItems,
      sort: "-views",
    },
  });
  const categories = useCategories({ params: { limit: 10 } });
  const handleSetTotalItems = () => {
    if (totalItems <= 100) {
      setTotalItems(totalItems + 20);
    }
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
          {totalItems <= 100 && (
            <ButtonLoadMore
              isLoading={songsOfRanking.isLoading}
              onClick={handleSetTotalItems}
              center
            ></ButtonLoadMore>
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
