import React from "react";
import CategoryContainer from "../../containers/CategoryContainer";
import useCategories from "../../hooks/useCategories";
import "./styles.scss";
const CategoriesPage = () => {
  const categories = useCategories();
  return (
    <div className="categories-page">
      <CategoryContainer
        headingText="Thể loại nhạc"
        categories={categories.data}
        loading={{ isLoading: categories.isLoading, totalItems: 15 }}
        // col={}
        col={{ xl: "2_4", lg: "2_4", md: 3, sm: 4 }}
      />
    </div>
  );
};

export default CategoriesPage;
