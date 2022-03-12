import classNames from 'classnames';
import React from 'react';
import CardSkeletons from '../../components/CardAlbum/CardSkeletons';
import CardSinger from '../../components/CardSinger';
import Heading from '../../components/Heading';

const SingerContainer = (props) => {
  const {
    singers = [],
    loading = { isLoading: false, totalItems: 0 },
    linkUrl = '',
    headingText = '',
    // cols = { xl: 2, lg: 6, md: 4, sm: 3, xs: 2 },
    col = { xl: 2, lg: 3, md: 3, sm: 4, xs: 6 },
    children,
  } = props;

  const renderSingers = () => {
    if (loading.isLoading) {
      return (
        <>
          <Heading headingText="Loading..."></Heading>
          <CardSkeletons
            // cols={cols}
            col={col}
            totalItems={loading.totalItems}
          />
        </>
      );
    } else {
      // const { xl, lg, md, sm, xs } = cols;
      if (singers.length > 0) {
        return (
          <>
            <Heading linkUrl={linkUrl} headingText={headingText}></Heading>
            <div
              className={classNames(
                'row'
                // {"row-cols-2" : !col},
                // { [`row-cols-xs-${xs}`]: xs },
                // { [`row-cols-sm-${cols.sm}`]: cols.sm },
                // { [`row-cols-md-${cols.md}`]: cols.md },
                // { [`row-cols-lg-${cols.lg}`]: cols.lg },
                // { [`row-cols-xl-${cols.xl}`]: cols.xl }
              )}
            >
              {singers.map((singer) => (
                <div
                  className={classNames('col col-6', {
                    [`col-xl-${col.xl}`]: col.xl,
                    [`col-lg-${col.lg}`]: col.lg,
                    [`col-md-${col.md}`]: col.md,
                    [`col-sm-${col.sm}`]: col.sm,
                  })}
                  key={singer._id}
                >
                  <CardSinger singer={singer} />
                </div>
              ))}
            </div>
            {children}
          </>
        );
      } else {
        return <Heading headingText="Không có ca sĩ nào"></Heading>;
      }
    }
  };
  return <div>{renderSingers()}</div>;
};

export default SingerContainer;
