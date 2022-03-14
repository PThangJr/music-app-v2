import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../pages/albums/albumSlice';
const useAlbums = (props = { params: {} }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      subUrl: props?.subUrl,
      params: {
        limit: props?.params?.limit,
        page: props?.params?.page,
        sort: props?.params?.sort,
      },
    };

    if (props?.params?.singers) {
      payload.params.singers = props.params.singers;
    }
    dispatch(fetchAlbums(payload));
  }, [
    dispatch,
    props.params.categories,
    props.params?.limit,
    props.params?.page,
    props.params.singers,
    props.params?.sort,
    props?.subUrl,
  ]);
  const albums = useSelector((state) => state.albums);
  return albums;
};

export default useAlbums;
