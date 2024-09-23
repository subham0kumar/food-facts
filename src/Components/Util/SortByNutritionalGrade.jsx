import React from 'react';

const SortByNutritionalGrade = ({ onSort }) => {
  const handleSort = (event) => onSort(event.target.value);

  return (
    <div className="w-full lg:w-[30%] gap-5 flex items-center justify-start px-8 py-4 lg:p-8">
      <label htmlFor="sort-grade">Nutritional Grade: </label>
      <select
        id="sort-grade"
        className="px-4 py-2 rounded-lg bg-gray-700 text-white"
        onChange={handleSort}
      >
        <option value="">Select</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortByNutritionalGrade;
