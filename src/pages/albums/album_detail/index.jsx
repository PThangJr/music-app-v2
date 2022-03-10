import React from "react";
import { useParams } from "react-router-dom";
import AlbumContainer from "../../../containers/AlbumContainer";
import SongsContainer from "../../../containers/SongContainer";
import useAlbums from "../../../hooks/useAlbums";
import useSongs from "../../../hooks/useSongs";

const AlbumDetail = () => {
  const { slug } = useParams();
  const songs = useSongs({
    subUrl: `/album/${slug}`,
    params: { limit: 15 },
  });
  const albums = useAlbums({ params: { limit: 8, sort: "-slug" } });
  return (
    <div>
      <div className="row">
        <div className="col-xl-9">
          <SongsContainer
            headingText={songs.album?.name}
            songs={songs.data}
            loading={{ isLoading: songs.isLoading, totalItems: 20 }}
          />
        </div>
        <div className="col-xl-3">
          <AlbumContainer
            headingText="Albums gợi ý"
            albums={albums.data}
            col={{ xl: 6, lg: "2_4", md: 3, sm: 4 }}
            loading={{ isLoading: albums.isLoading, totalItems: 8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
