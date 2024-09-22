import React from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./Components/ProductPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default App;
