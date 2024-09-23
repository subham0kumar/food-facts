import React, { useEffect, useState } from "react";
import { SearchState } from "../Contexts/SearchContext";
import Card2 from "./CardComponent/Card2";
import { Loader } from "./Loader/Loader";
import SortByName from "./SortByName";
import SortByNutritionalGrade from "./SortByNutritionalGrade";
import CategoryFilter from "./CategoryFilter";

const ProductList = () => {
  const {
    productAvailable,
    fetchDataByCategory,
    fetchDataOnCodeSearch,
    debouncedCode,
    debouncedSearch,
    fetchDataOnSearch,
    products,
    fetchData,
    page,
    setPage,
    loading,
    selectedCategory,
    setSelectedCategory
  } = SearchState();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    if (!debouncedSearch && !debouncedCode) {
      fetchData();
    }
  }, [page, debouncedSearch, debouncedCode]);

  useEffect(() => {
    if (selectedCategory) {
      fetchDataByCategory();
    }
  }, [selectedCategory]);


  useEffect(() => {
    if (debouncedSearch) {
      fetchDataOnSearch();
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedCode) {
      fetchDataOnCodeSearch(debouncedCode);
    }
  }, [debouncedCode]);

  const sortProducts = (type, order) => {
    let sorted = [...products];
    if (type === "name") {
      sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (type === "nutritionalGrade") {
      sorted.sort((a, b) => a.nutrition_grades.localeCompare(b.nutrition_grades));
    }
    if (order === "desc") {
      sorted.reverse();
    }
    setSortedProducts(sorted);
  };

  const handleSort = (type, order) => {
    setSortType(type);
    setSortOrder(order);
    sortProducts(type, order);
  };

  useEffect(() => {
    sortProducts(sortType, sortOrder);
  }, [products, sortType, sortOrder]);

  if (!productAvailable) {
    return <div>Product unavailable</div>;
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row md:flex-col gap-4 justify-center mb-4">
        <SortByName onSort={(order) => handleSort("name", order)} />
        <SortByNutritionalGrade onSort={(order) => handleSort("nutritionalGrade", order)} />
        <CategoryFilter onCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 justfy-center px-5 gap-10">
        {sortedProducts.map((item, index) => (
          <Card2
            key={index}
            id={item._id || item.id}
            product_name={item.product_name}
            img_url={item.image_front_url || item.image_url}
            nutrition_grade={item.nutrition_grades}
            categories={item.categories_old}
            ingredients={item.ingredients_text_en}
          />
        ))}
      </div>
      {loading && (
        <span className="gap-10 flex flex-col items-center justify-center"> <Loader />
        </span>
      )}
      {!debouncedCode && !debouncedSearch && (
        <div className="w-full flex justify-center">
          <button className='mt-10 hover:bg-gray-800 text-gray-200 bg-gray-900 px-5 py-2 rounded-lg font-bold' onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        </div>
      )}
    </>
  );
};

export default ProductList;