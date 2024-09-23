import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductPage2 from './Components/Pages/ProductPage2';
import Home from "./Components/Pages/Home";

function App() {
  return (
    <div className="App bg-gray-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage2 />} />
      </Routes>
    </div>
  );
}

export default App;
