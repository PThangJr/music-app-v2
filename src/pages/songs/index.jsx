import React, { useMemo } from 'react';
import Pagination from '../../components/Pagination';
import AlbumContainer from '../../containers/AlbumContainer';
import SongsContainer from '../../containers/SongContainer';
import useAlbums from '../../hooks/useAlbums';
import useQuery from '../../hooks/useQuery';
import useSongs from '../../hooks/useSongs';
import './styles.scss';
const SongsPage = () => {
  const { limit, page, sort } = useQuery();
  const pageRandom = useMemo(() => {
    return Math.random() * 2 + 1;
  }, []);
  const { data, isLoading, totalPages } = useSongs({
    params: { limit: limit || 20, page: page || 1, sort: sort || 'slug' },
  });
  const albums = useAlbums({
    params: { limit: 10, page: pageRandom, sort: '-createdAt' },
  });

  return (
    <div>
      <div className="row">
        <div className="col-xl-9">
          <SongsContainer headingText="Tất cả bài hát" songs={data} loading={{ isLoading, totalItems: 20 }} sorting>
            <Pagination totalItems={5} currentPage={page} totalPages={totalPages} />
          </SongsContainer>
        </div>
        <div className="col-xl-3">
          <AlbumContainer
            headingText="Album gợi ý"
            albums={albums.data}
            loading={{ isLoading: albums.isLoading, totalItems: 10 }}
            col={{ xl: 6, lg: '2_4', md: 3, sm: 4, xs: 2 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SongsPage;
