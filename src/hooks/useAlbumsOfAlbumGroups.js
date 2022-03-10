import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAlbumsOfAlbumGroups } from "../pages/albums/albumsOfAlbumGroupsSlice";
const useAlbumsOfAlbumGroups = (props) => {
  const location = useLocation();
  const { limit, page } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  const dispatch = useDispatch();
  console.log(props);
  useEffect(() => {
    dispatch(
      fetchAlbumsOfAlbumGroups({
        data: props?.data,
        params: {
          limit: limit || props?.params?.limit,
          page: page || props?.params?.page,
        },
      })
    );
  }, [
    dispatch,
    limit,
    page,
    props?.data,
    props?.params?.limit,
    props?.params?.page,
  ]);
  const anthologyAlbums = useSelector((state) => state.anthologyAlbums);
  return { ...anthologyAlbums };
};

export default useAlbumsOfAlbumGroups;
