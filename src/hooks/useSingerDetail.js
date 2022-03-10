import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingerBySlug } from "../pages/singers/singer_detail/singerDetailSlice";
const useSingerDetail = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingerBySlug(props));
  }, [dispatch, props]);
  const singerDetail = useSelector((state) => state.singerDetail);
  return singerDetail;
};

export default useSingerDetail;
