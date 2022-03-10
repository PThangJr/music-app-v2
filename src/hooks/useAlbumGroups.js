import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAlbumGroups } from "../pages/album_groups/albumGroup";
const useAlbumGroups = (props) => {
  const location = useLocation();
  const { limit, page } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAlbumGroups({
        params: {
          limit: limit || props?.params?.limit,
          page: page || props?.params?.page,
          sort: props?.params?.sort,
        },
      })
    );
  }, [
    dispatch,
    limit,
    page,
    props?.params?.limit,
    props?.params?.page,
    props?.params?.sort,
  ]);
  const albumGroups = useSelector((state) => state.albumGroups) || { data: [] };
  return { ...albumGroups };
};

export default useAlbumGroups;
