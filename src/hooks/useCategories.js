import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../pages/categories/categorySlice';
const useCategories = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCategories({
        params: {
          limit: props?.params?.limit,
          page: props?.params?.page,
          sort: props?.params?.sort,
        },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.page, props?.params?.sort]);
  const categories = useSelector((state) => state.categories);
  return { ...categories };
};

export default useCategories;
