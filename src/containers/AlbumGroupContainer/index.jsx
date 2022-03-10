import React from "react";
import { Link } from "react-router-dom";
import CardAlbum from "../../components/CardAlbum";
import CardSkeletons from "../../components/CardAlbum/CardSkeletons";
import Heading from "../../components/Heading";

const AlbumGroupContainer = (props) => {
  const {
    headingText = "",
    linkUrl = "",
    albums = [],
    loading = { isLoading: false, totalItems: 0 },
  } = props;
  // console.log(albums);
  const renderAlbumGroup = () => {
    if (loading.isLoading) {
      return (
        <>
          <Heading headingText="Loading..."></Heading>
          <CardSkeletons totalItems={loading.totalItems} />
        </>
      );
    } else {
      return (
        <>
          <header className="album-group-container-header">
            {linkUrl ? (
              <Heading headingText={headingText} linkUrl={linkUrl}></Heading>
            ) : (
              <Heading>{headingText}</Heading>
            )}
          </header>
          <div className="album-group-container__main">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 ">
              {albums.map((album) => (
                <div className="col" key={album._id}>
                  <CardAlbum album={album} />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="album-group-container">{renderAlbumGroup()}</div>;
};

export default AlbumGroupContainer;
