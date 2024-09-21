import React, { useEffect } from "react";
import { SearchState } from "../Contexts/SearchContext";
import { Card } from "./CardComponent/Card";
import { Loader } from "./Loader/Loader";

const ProductList = () => {
  const { debouncedSearch, fetchDataOnSearch, products, fetchData, page, setPage, loading } = SearchState();

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchDataOnSearch();
  }, [debouncedSearch]);

  return (
    <>
      <div className="grid grid-cols-4 gap-10 items-start justify-start">
        {products.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            product_name={item.product_name}
            img_url={item.image_front_url}
            nutrition_grade={item.nutrition_grades}
            categories={item.categories}
            ingredients={item.ingredients_text}
          />
        ))}
      </div>

      {loading && (
        <span className="gap-10 flex flex-col items-center justify-center">
          <h1>Fetching Data</h1> <Loader />
        </span>
      )}

      <button className="mt-16 border-2 border-[#fefef477] p-2 rounded-lg" onClick={() => setPage((prev) => prev + 1)}>
        Load More
      </button>
    </>
  );
};

export default ProductList;