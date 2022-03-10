import React from "react";
import { useParams } from "react-router-dom";
import AlbumContainer from "../../containers/AlbumContainer";
import useAlbums from "../../hooks/useAlbums";
import "./styles.scss";
const AlbumGroupsPage = () => {
  const { slug } = useParams();
  const albumsOfAlbumGroup = useAlbums({
    subUrl: `/album_groups/${slug}`,
    params: { limit: 20 },
  });
  return (
    <AlbumContainer
      headingText={albumsOfAlbumGroup.albumGroup?.name}
      albums={albumsOfAlbumGroup.data}
      loading={{ isLoading: albumsOfAlbumGroup.isLoading, totalItems: 12 }}
    />
  );
};

export default AlbumGroupsPage;
