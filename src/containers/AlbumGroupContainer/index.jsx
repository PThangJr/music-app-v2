import classNames from 'classnames';
import React from 'react';
import CardAlbum from '../../components/CardAlbum';
import CardSkeletons from '../../components/CardAlbum/CardSkeletons';
import Heading from '../../components/Heading';

const AlbumGroupContainer = (props) => {
  const {
    headingText = '',
    linkUrl = '',
    albums = [],
    loading = { isLoading: false, totalItems: 6 },
    col = { xl: 2, lg: 3, md: 4, sm: 6 },
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
            <div className="row">
              {albums.map((album) => (
                <div
                  className={classNames('col col-6', {
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
          </div>
        </>
      );
    }
  };

  return <div className="album-group-container">{renderAlbumGroup()}</div>;
};

export default AlbumGroupContainer;
