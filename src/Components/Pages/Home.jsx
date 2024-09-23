import React from "react";
import Navbar from "../Navbar";
import ProductList from "../ProductList";
import { Search } from "../Search";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-56 lg:pt-24 text-white p-10 flex flex-col items-center justify-center">
        <main className="w-full min-h-screen grid items-start justify-center">
          <Search />
          <ProductList />
        </main>
      </div>
    </>
  );
};

export default Home;
