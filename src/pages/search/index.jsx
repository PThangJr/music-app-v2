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
import Button from "../../components/Button";
import { playAllSongs } from "../../features/Playlist/playlistSlice";
import { setIsPlaying } from "../../features/Player/PlayerControl/playerControlSlice";
const SearchPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  //************Initial state*********

  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchSearch({
        params: {
          keyword: queryParams.keyword,
          s_limit: queryParams.s_limit || 20,
          s_page: queryParams.s_page,
          sg_limit: queryParams.sg_limit || 24,
          sg_page: queryParams.sg_page,
          al_limit: queryParams.al_limit || 12,
          al_page: queryParams.al_page,
        },
      })
    );
  }, [
    dispatch,
    queryParams.al_limit,
    queryParams.al_page,
    queryParams.keyword,
    queryParams.s_limit,
    queryParams.s_page,
    queryParams.sg_limit,
    queryParams.sg_page,
  ]);
  //***********Get data from store*****************
  const search = useSelector((state) => state.search);
  const {
    albums: { data: dataAlbums, totalPages: totalPageAlbums },
    songs: { data: dataSongs, totalPages: totalPageSongs },
    songsOfSingers: {
      data: dataSongsOfSingers,
      totalPages: totalPageSongsOfSingers,
    },
    singers: { data: dataSingers, totalPages: totalPageSingers },
    isLoading,
  } = search;

  //***********Handle event**************
  const handlePlayAllSongs = () => {
    dispatch(playAllSongs([...dataSongs, ...dataSongsOfSingers]));
    dispatch(setIsPlaying(true));
  };
  //***********Calculation**************
  // const maxPage = useMemo(() => {
  //   return Math.max(totalPageSongs, totalPageSongsOfSingers);
  // }, [totalPageSongs, totalPageSongsOfSingers]);
  //***********Render UI*****************

  return (
    <div className="search-page">
      <Heading>Kết quả tìm kiếm</Heading>
      <div className="row">
        <div className="col-xl-9">
          <div className="search-item">
            <Heading
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Bài hát
              {!isLoading && (
                <Button
                  className="btn--green btn--play-all"
                  btnSmall
                  onClick={handlePlayAllSongs}
                >
                  Phát tất cả
                  <i className="fa-solid fa-play"></i>
                </Button>
              )}
            </Heading>
            <SongContainer
              songs={dataSongs}
              loading={{ isLoading, totalItems: 3 }}
              btnPlayAll={false}
              hasHeader={false}
            />
            <SongContainer
              songs={dataSongsOfSingers}
              loading={{ isLoading, totalItems: 3 }}
              hasHeader={false}
            />
            {/* <Pagination
              totalPages={maxPage}
              currentPage={Number(queryParams.s_page)}
              pageRangeDisplay={5}
              formatPage="s_page"
            /> */}
          </div>
          <div className="search-item">
            <SingerContainer
              singers={dataSingers}
              loading={{ isLoading, totalItems: 12 }}
              headingText="Ca sĩ"
            />
            {/* <Pagination
              currentPage={Number(queryParams.sg_page)}
              totalPages={totalPageSingers}
              formatPage="sg_page"
            /> */}
          </div>
        </div>
        <div className="col-xl-3">
          <AlbumContainer
            loading={{ isLoading, totalItems: 6 }}
            albums={dataAlbums}
            col={{ xl: 6, lg: 3, md: 3, sm: 4 }}
            headingText="Album"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
