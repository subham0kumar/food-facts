import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchState } from '../Contexts/SearchContext';

function CategoryFilter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = SearchState();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://world.openfoodfacts.org/categories.json');
      setCategories(response.data.tags);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="lg:w-[40%] w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white">
      <h3>Filter by Category</h3>
      <select
        className='px-4 py-2 rounded-lg bg-gray-800 text-white'
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="-">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
