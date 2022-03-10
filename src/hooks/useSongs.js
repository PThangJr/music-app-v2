import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../pages/songs/songSlice";
const useSongs = (
  props = { params: { page: 1, limit: 0, sort: "-createdAt" } }
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      subUrl: props?.subUrl,
      params: {
        limit: props?.params?.limit,
        page: props?.params?.page,
        sort: props?.params?.sort,
        categories: props?.params?.categories,
      },
    };
    if (props?.params?.singers) {
      payload.params.singers = props?.params?.singers;
    }
    dispatch(fetchSongs(payload));
  }, [
    dispatch,
    props?.params?.categories,
    props?.params?.limit,
    props?.params?.page,
    props?.params?.singers,
    props?.params?.sort,
    props?.subUrl,
  ]);
  // useEffect(() => {
  //   const {
  //     limit: limitItem,
  //     page: currentPage,
  //     sort: sortBy,
  //     singers,
  //   } = props.params;
  //   console.log(props);
  //   dispatch(
  //     fetchSongs({
  //       params: {
  //         limit: limit || limitItem,
  //         page: page || currentPage,
  //         sort: sort || sortBy,
  //         singers: singers || "",
  //       },
  //     })
  //   );
  // }, [dispatch, limit, page, sort]);
  const songs = useSelector((state) => state.songs);
  return { ...songs };
};

export default useSongs;
