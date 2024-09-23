import React from 'react';

const SortByNutritionalGrade = ({ onSort }) => {
  const handleSort = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className="lg:w-[30%] w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white">
      <label htmlFor="sort-grade">Sort by Nutritional Grade: </label>
      <select id="sort-grade" className='px-4 py-2 rounded-lg bg-gray-800 text-white' onChange={handleSort}>
        <option value="">Select</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortByNutritionalGrade;
