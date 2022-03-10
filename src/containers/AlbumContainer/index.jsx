import classNames from "classnames";
import React from "react";
import CardAlbum from "../../components/CardAlbum";
import CardSkeletons from "../../components/CardAlbum/CardSkeletons";
import Heading from "../../components/Heading";

const AlbumContainer = (props) => {
  const {
    albums = [],
    loading = { isLoading: false, totalItems: 0 },
    linkUrl = "",
    headingText = "",
    col = { xl: 2, lg: "2_4", md: 3, sm: 4 },
  } = props;

  const renderAlbums = () => {
    if (loading.isLoading) {
      return (
        <>
          <Heading>Loading...</Heading>
          <CardSkeletons col={col} totalItems={loading.totalItems} />
        </>
      );
    } else {
      return (
        <>
          <Heading linkUrl={linkUrl} headingText={headingText}></Heading>
          <div
            className={classNames(
              "row "
              // { [`row-cols-xs-${xs}`]: xs },
              // { [`row-cols-sm-${sm}`]: sm },
              // { [`row-cols-md-${md}`]: md },
              // { [`row-cols-lg-${lg}`]: lg },
              // { [`row-cols-xl-${xl}`]: xl }
            )}
          >
            {albums.map((album) => (
              <div
                className={classNames("col col-6", {
                  [`col-xl-${col.xl}`]: col.xl,
                  [`col-lg-${col.lg}`]: col.lg,
                  [`col-md-${col.md}`]: col.md,
                  [`col-sm-${col.sm}`]: col.sm,
                })}
                key={album._id}
              >
                <CardAlbum album={album} />
              </div>
            ))}
          </div>
        </>
      );
    }
  };
  return <div>{renderAlbums()}</div>;
};

export default AlbumContainer;
