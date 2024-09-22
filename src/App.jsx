import React, { useState } from 'react';
import ProductList from './Components/ProductList';
import CategoryFilter from './Components/CategoryFilter';
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./Components/ProductPage";
import ProductPage2 from './Components/ProductPage2';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // You might want to trigger a new product search here with the selected category
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage2 />} />
      </Routes>
    </div>
  );
}

export default App;
