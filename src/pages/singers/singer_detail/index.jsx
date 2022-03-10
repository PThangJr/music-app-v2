import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardSkeletons from "../../../components/CardAlbum/CardSkeletons";
import CardSinger from "../../../components/CardSinger";
import Heading from "../../../components/Heading";
import AlbumContainer from "../../../containers/AlbumContainer";
import SongContainer from "../../../containers/SongContainer";
import useSingerDetail from "../../../hooks/useSingerDetail";
import { fetchAlbums } from "../../albums/albumSlice";
import { fetchSongs } from "../../songs/songSlice";
import "./styles.scss";
const SingerDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const singerDetail = useSingerDetail(slug);

  useEffect(() => {
    if (singerDetail.data._id) {
      dispatch(fetchAlbums({ params: { singers: singerDetail.data._id } }));
      dispatch(fetchSongs({ params: { singers: singerDetail.data._id } }));
    }
  }, [dispatch, singerDetail.data._id]);
  const albums = useSelector((state) => state.albums);
  const songs = useSelector((state) => state.songs);

  return (
    <div className="singer-detail-page">
      <div className="singer-detail-header">
        <Heading>{singerDetail.data?.name}</Heading>
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-9 col-sm-8">
            <div className="singer-detail-profile">
              {singerDetail.data?.profile}
            </div>
          </div>
          <div className=" col-xl-2 col-lg-2 col-md-3 col-sm-4">
            {singerDetail.isLoading && (
              <CardSkeletons
                totalItems={1}
                col={{ xl: 12, lg: 12, md: 12, sm: 12 }}
              />
            )}
            {!singerDetail.isLoading && (
              <CardSinger singer={singerDetail.data} />
            )}
          </div>
        </div>
      </div>
      <div className="singer-detail-product">
        <div className="row">
          <div className="col-xl-10">
            <SongContainer
              headingText="Bài hát"
              songs={songs.data}
              loading={{ isLoading: songs.isLoading, totalItems: 10 }}
            />
          </div>
          <div className="col-xl-2">
            <AlbumContainer
              headingText="Albums"
              albums={albums.data}
              loading={{ isLoading: albums.isLoading, totalItems: 2 }}
              col={{ xl: 12, lg: 4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingerDetail;
