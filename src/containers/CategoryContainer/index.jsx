import React from "react";
import CardSkeletons from "../../components/CardAlbum/CardSkeletons";
import CardCategory from "../../components/CardCategory";
import Heading from "../../components/Heading";
import classNames from "classnames";

const CategoryContainer = (props) => {
  const {
    categories = [],
    loading = { isLoading: false, totalItems: 0 },
    linkUrl = "",
    headingText = "",
    col = { xl: 6, lg: "2_4", md: 3, sm: 4 },
  } = props;

  const renderCategories = () => {
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
              "row"
              // { [`row-cols-sm-${sm}`]: sm },
              // { [`row-cols-xs-${xs}`]: xs },
              // { [`row-cols-md-${md}`]: md },
              // { [`row-cols-lg-${lg}`]: lg },
              // { [`row-cols-xl-${xl}`]: xl }
            )}
          >
            {categories.map((category) => (
              <div
                className={classNames(
                  "col col-6",
                  { [`col-xl-${col.xl}`]: col.xl },
                  { [`col-lg-${col.lg}`]: col.lg },
                  { [`col-md-${col.md}`]: col.md },
                  { [`col-sm-${col.sm}`]: col.sm },
                  { [`col-xs-${col.xs}`]: col.xs }
                )}
                key={category._id}
              >
                <CardCategory category={category} />
              </div>
            ))}
          </div>
        </>
      );
    }
  };
  return <div>{renderCategories()}</div>;
};

export default CategoryContainer;
