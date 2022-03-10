import React from "react";
import { useParams } from "react-router-dom";
import CardAlbum from "../../../components/CardAlbum";
import CardSong from "../../../components/CardSong";
import Heading from "../../../components/Heading";
import useAlbums from "../../../hooks/useAlbums";
import useSongs from "../../../hooks/useSongs";

const CategoryDetail = () => {
  const { slug, id } = useParams();
  const songsOfCategory = useSongs({
    subUrl: `/category/${slug}`,
    params: { limit: 20 },
  });

  const albumsOfCategory = useAlbums({
    subUrl: `/category/${slug}`,
    params: { limit: 10 },
  });
  return (
    <div className="category-detail-page">
      <Heading headingText="Thể loại" />
      <div className="row">
        <div className="col-xl-9">
          <Heading headingText="Bài hát" />
          {songsOfCategory.data.map((song) => (
            <CardSong key={song?._id} song={song} />
          ))}
        </div>
        <div className="col-xl-3">
          <div className="row row-cols-2">
            {albumsOfCategory.data.map((album) => (
              <div key={album._id} className="col">
                <CardAlbum album={album} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
