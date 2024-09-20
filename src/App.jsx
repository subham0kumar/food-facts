import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import Loader from "./Components/Loader/Loader";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true&page=${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="bg-[#251515] text-white p-10 flex flex-col items-center justify-center border-2 border-black">
      <main className="min-h-screen">
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
        {loading && (
          <span className="gap-10 flex flex-col items-center justify-center">
            <h1>Fetching Data</h1> <Loader />
          </span>
        )}
      </main>
    </div>
  );
};

export default App;
