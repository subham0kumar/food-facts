import axios from "axios";
import React, { useState } from "react";
import Card from "./Components/Card";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true"
      );
      setProducts(data.products);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center border-2 border-black">
      <main className="h-[60vh] w-[80vw] px-20 overflow-auto bg-gray-400">
        <h1 className="text-center text-xl font-bold">Data</h1>
        {loading ? (
          <h1>Fetching Data</h1>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {products.map((item) => (
              <Card
                id={item._id}
                product_name={item.product_name}
                img_url={item.image_front_url}
                nutrition_grade={item.nutrition_grades}
                categories={item.categories}
                ingredients={item.ingredients_text}
              />
              // <span className="flex flex-col">
              //   <h1 key={item._id}>{item.nutrition_grades}</h1>
              //   <img
              //     className="object-contain aspect-square"
              //     src={item.image_front_url}
              //     alt={item.product_name}
              //   />
              // </span>
            ))}
          </div>
        )}
      </main>
      <button
        className="m-10 px-6 py-2 rounded-xl bg-gray-800 text-gray-100 border"
        onClick={() => fetchData()}
      >
        Request Items
      </button>
    </div>
  );
};

export default App;
