import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategories } from "../pages/categories/categorySlice";
const useCategories = (props) => {
  const location = useLocation();
  const { limit, page } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchCategories({
        params: {
          limit: limit || props?.params?.limit,
          page: page || props?.params?.page,
        },
      })
    );
  }, [dispatch, limit, page, props?.params?.limit, props?.params?.page]);
  const categories = useSelector((state) => state.categories);
  return { ...categories };
};

export default useCategories;
