import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AlbumGroupContainer from '../../containers/AlbumGroupContainer';
import useAlbumGroups from '../../hooks/useAlbumGroups';
import { fetchAlbumsOfAlbumGroups } from './albumsOfAlbumGroupsSlice';

import './styles.scss';
const AlbumsPage = () => {
  const dispatch = useDispatch();

  const albumGroups = useAlbumGroups({ params: { sort: 'createdAt' } });

  useEffect(() => {
    if (albumGroups.data.length > 1) {
      const data = albumGroups.data.map((alg) => ({
        [`${alg.name}`]: alg._id,
      }));
      dispatch(
        fetchAlbumsOfAlbumGroups({
          data: { album_groups: data },
          params: { limit: 12 },
        })
      );
    }
  }, [albumGroups.data, dispatch]);

  const albumsOfAlbumGroups = useSelector((state) => state.albumsOfAlbumGroups);
  return (
    <>
      {albumGroups.data.map((albumGroup) => {
        return (
          <AlbumGroupContainer
            key={albumGroup._id}
            headingText={albumGroup.name}
            linkUrl={`/albums/album_groups/${albumGroup.slug}`}
            loading={{
              isLoading: albumsOfAlbumGroups.isLoading,
              totalItems: 6,
            }}
            albums={albumsOfAlbumGroups.data.find((abg) => Object.keys(abg)[0] === albumGroup.name)?.[albumGroup.name]}
            col={{ xl: 2 }}
          />
        );
      })}
    </>
  );
};

export default AlbumsPage;
