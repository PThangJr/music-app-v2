import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongOfRanking } from '../pages/rank/songOfRankingSlice';
const useSongsOfRanking = (props = { params: { page: 1, limit: 0, sort: '-createdAt' } }) => {
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
    dispatch(fetchSongOfRanking(payload));
  }, [
    dispatch,
    props?.params?.categories,
    props?.params?.limit,
    props?.params?.page,
    props?.params?.singers,
    props?.params?.sort,
    props?.subUrl,
  ]);
  const songsOfRanking = useSelector((state) => state.songsOfRanking) || { data: [] };
  return songsOfRanking;
};

export default useSongsOfRanking;
