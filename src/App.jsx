import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import ProductPage2 from './Components/ProductPage2';
import Home from "./Home";

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // You might want to trigger a new product search here with the selected category
  };

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
