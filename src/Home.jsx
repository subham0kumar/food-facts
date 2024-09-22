import React from "react";
import { Search } from "./Components/Search";
import ProductList from "./Components/ProductList";
import Navbar from "./Components/Navbar";
import CategoryFilter from "./Components/CategoryFilter";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 text-white p-10 flex flex-col items-center justify-center">
        <main className="min-h-screen grid place-items-center">
          <Search />
          {/* <CategoryFilter /> */}
          <ProductList />
        </main>
      </div>
    </>
  );
};

export default Home;
