import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
const useQuery = () => {
  const location = useLocation();
  const { limit, page, sort } = queryString.parse(location.search, {
    parseNumbers: true,
  });

  return { limit, page, sort };
};

export default useQuery;
