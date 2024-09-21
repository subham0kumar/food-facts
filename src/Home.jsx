import React, { useEffect } from "react";
import { SearchState } from "./Contexts/SearchContext";
import { Loader } from "./Components/Loader/Loader";
import { Search } from "./Components/Search";
import { Card } from "./Components/CardComponent/Card";

const Home = () => {
  const { fetchDataOnSearch, search, products, fetchData, page, setPage, loading } = SearchState();
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchDataOnSearch();
  }, [search]);


  console.log(page);
  return (
    <div className="bg-[#251515] text-white p-10 flex flex-col items-center justify-center border-2 border-black">
      <main className="min-h-screen grid place-items-center gap-10">
        <Search />
        <h1 className="text-center text-xl font-bold mb-10">Data</h1>
        <div className=" grid grid-cols-4 gap-10 items-start justify-start">
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
        <button className="border-2 border-[#fefef477] p-2 rounded-lg" onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        {loading && (
          <span className="gap-10 flex flex-col items-center justify-center">
            <h1>Fetching Data</h1> <Loader />
          </span>
        )}
      </main>
    </div>
  );
};

export default Home;
