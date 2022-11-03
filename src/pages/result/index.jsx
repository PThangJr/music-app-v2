import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "./searchSlice";
import SongContainer from "../../containers/SongContainer";
import AlbumContainer from "../../containers/AlbumContainer";
import SingerContainer from "../../containers/SingerContainer";
import Heading from "../../components/Heading";
import Pagination from "../../components/Pagination";
import "./styles.scss";
import { fetchSingers } from "../singers/singerSlice";
const SearchPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  //************Initial state*********

  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchSingers({ params: { search: queryParams.search, limit: 18 } })
    );
  }, [dispatch, queryParams.search]);
  //***********Get data from store*****************
  const singers = useSelector((state) => state.singers);
  // console.log(singers);
  //***********Handle event**************

  //***********Calculation**************

  //***********Render UI*****************

  return (
    <div className="search-page">
      <Heading>Kết quả tìm kiếm</Heading>
      <div className="row">
        <div className="col-xl-9">
          <div className="search-item">
            <Heading>Bài hát</Heading>
            {/* <SongContainer
              songs={dataSongs}
              loading={{ isLoading, totalItems: 8 }}
              btnPlayAll={false}
              hasHeader={false}
            />
            <SongContainer songs={dataSongsOfSingers} hasHeader={false} />
            <Pagination
              totalPages={maxPage}
              currentPage={Number(queryParams.s_page)}
              pageRangeDisplay={5}
              formatPage="s_page"
            /> */}
          </div>
          <div className="search-item">
            {/* <SingerContainer
              singers={dataSingers}
              loading={{ isLoading, totalItems: 6 }}
              headingText="Ca sĩ"
            />
            <Pagination
              currentPage={Number(queryParams.sg_page)}
              totalPages={totalPageSingers}
              formatPage="sg_page"
            /> */}
          </div>
        </div>
        <div className="col-xl-3">
          {/* <AlbumContainer
            loading={{ isLoading, totalItems: 6 }}
            albums={dataAlbums}
            col={{ xl: 6, lg: 3, md: 3, sm: 4 }}
            headingText="Album"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
