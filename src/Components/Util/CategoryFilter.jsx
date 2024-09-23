import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchState } from '../../Contexts/SearchContext';

function CategoryFilter({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = SearchState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://world.openfoodfacts.org/categories.json');
        setCategories(response.data.tags);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="w-full lg:w-[40%] gap-5 flex items-center justify-start px-8 py-4 lg:p-8">
      <h3>Category:</h3>
      <select
        className="w-full p-2 text-center rounded-lg bg-gray-700 text-white"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="-">All Categories</option>
        {categories.map((category) => (
          <option className='truncate' key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
