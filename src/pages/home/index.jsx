import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Trending from '../../components/Trending';
import AlbumGroupContainer from '../../containers/AlbumGroupContainer';
import CategoryContainer from '../../containers/CategoryContainer';
import SingerContainer from '../../containers/SingerContainer';
import SongContainer from '../../containers/SongContainer';
import useAlbumGroups from '../../hooks/useAlbumGroups';
import useCategories from '../../hooks/useCategories';
import useSingers from '../../hooks/useSingers';
import useSongs from '../../hooks/useSongs';
import { fetchAlbumsOfAlbumGroups } from '../albums/albumsOfAlbumGroupsSlice';
import { fetchSongOfRanking } from '../rank/songOfRankingSlice';
import './styles.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Get songs sort by views
    dispatch(
      fetchSongOfRanking({
        params: { limit: 15 },
      })
    );
  }, [dispatch]);
  const pageRandom = useMemo(() => {
    return Math.random() * 3 + 1;
  }, []);

  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const songsNew = useSongs({ params: { limit: 14, sort: '-createdAt' } });
  const categories = useCategories({ params: { limit: 12, sort: 'slug' } });
  const singers = useSingers({
    params: { limit: 12, page: pageRandom, sort: '-createdAt' },
  });
  const albumGroups = useAlbumGroups({ params: { sort: 'createdAt' } });
  const albumsOfAlbumGroups = useSelector((state) => state.albumsOfAlbumGroups);
  useEffect(() => {
    if (albumGroups.data.length > 1) {
      const data = albumGroups.data.map((alg) => ({
        [`${alg.name}`]: alg._id,
      }));
      dispatch(
        fetchAlbumsOfAlbumGroups({
          data: { album_groups: data },
          params: { limit: 5 },
        })
      );
    }
  }, [albumGroups.data, dispatch]);

  return (
    <div className="home-page">
      <Trending />
      <section className="home-section">
        <div className="row">
          <div className="col-xl-9">
            <SongContainer
              headingText="Bài hát mới"
              linkUrl={`/bai-hat?sort=-createdAt`}
              songs={songsNew.data}
              loading={{ isLoading: songsNew.isLoading, totalItems: 12 }}
            />
          </div>
          <div className="col-xl-3">
            <CategoryContainer
              headingText="Thể loại"
              linkUrl="/the-loai"
              categories={categories.data}
              loading={{ isLoading: categories.isLoading, totalItems: 10 }}
              col={{ xl: 6, lg: '2_4', md: 3, sm: 4 }}
            />
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="row">
          <div className="col-xl-9">
            {albumGroups.isLoading &&
              [1, 2, 3, 4].map((alg) => (
                <AlbumGroupContainer
                  key={`album-groups-${alg}`}
                  loading={{
                    isLoading: albumGroups.isLoading,
                    totalItems: 6,
                  }}
                  col={{ xl: '2_4', lg: '2_4', md: '2_4', sm: 4 }}
                />
              ))}
            {!albumGroups.isLoading &&
              albumGroups.data.map((albumGroup) => {
                return (
                  <AlbumGroupContainer
                    key={albumGroup._id}
                    headingText={albumGroup.name}
                    linkUrl={`/albums/album_groups/${albumGroup.slug}`}
                    loading={{
                      isLoading: albumsOfAlbumGroups.isLoading,
                      totalItems: 6,
                    }}
                    // col={{ xl: '2_4' }}
                    col={{ xl: '2_4', lg: '2_4', md: '2_4', sm: 4 }}
                    albums={
                      albumsOfAlbumGroups.data.find((abg) => Object.keys(abg)[0] === albumGroup.name)?.[albumGroup.name]
                    }
                  />
                );
              })}
          </div>
          <div className="col-xl-3">
            <div className="home-section__rank">
              <SongContainer
                headingText="Bảng xếp hạng"
                linkUrl={`/bang-xep-hang`}
                songs={songsOfRanking.data}
                loading={{ isLoading: songsOfRanking.isLoading, totalItems: 12 }}
                ranking
              />
            </div>
          </div>
        </div>
      </section>
      <section className="home-section">
        <SingerContainer
          headingText="Ca sĩ"
          linkUrl="/ca-si"
          singers={singers.data}
          loading={{ isLoading: singers.isLoading, totalItems: 10 }}
          // cols={{ xl: 2, lg: 6, md: 4, sm: 3, xs: 2 }}
          col={{ xl: 2, lg: 3, md: 3, sm: 4, xs: 6 }}
        />
        <div className="row">
          <div className="col-xl-9"></div>
          <div className="col-xl-3">
            <div className="row"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
