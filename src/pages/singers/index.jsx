import React from "react";
import CardSinger from "../../components/CardSinger";
import Pagination from "../../components/Pagination";
import SingerContainer from "../../containers/SingerContainer";
import useQuery from "../../hooks/useQuery";
import useSingers from "../../hooks/useSingers";
import "./styles.scss";
const SingersPage = () => {
  const { limit, page, sort } = useQuery();
  const singers = useSingers({
    params: { limit: limit || 18, page: page || 1, sort: sort || "slug" },
  });
  return (
    <div className="singer-page">
      <SingerContainer
        headingText="Tất cả ca sĩ"
        singers={singers.data}
        loading={{ isLoading: singers.isLoading, totalItems: 24 }}
        col={{ xl: 2, lg: 3, md: 3, sm: 4, xs: 6 }}
      >
        <Pagination totalPages={singers.totalPages} currentPage={page} />
      </SingerContainer>
    </div>
  );
};

export default SingersPage;
