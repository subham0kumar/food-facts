import React from "react";
import { Search } from "./Components/Search";
import ProductList from "./Components/ProductList";

const Home = () => {
  return (
    <div className="bg-gray-950 text-white p-10 flex flex-col items-center justify-center border-2 border-black">
      <main className="min-h-screen grid place-items-center">
        <Search />
        <h1 className="text-center text-xl font-bold mb-10">Data</h1>
        <ProductList />
      </main>
    </div>
  );
};

export default Home;
