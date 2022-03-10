import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingers } from "../pages/singers/singerSlice";
const useSingers = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchSingers({
        params: {
          limit: props?.params?.limit,
          page: props?.params?.page,
          sort: props?.params?.sort,
        },
      })
    );
  }, [
    dispatch,
    props?.params?.limit,
    props?.params?.page,
    props?.params?.sort,
  ]);
  const singers = useSelector((state) => state.singers);
  return singers;
};

export default useSingers;
