import React from 'react';

const SortByName = ({ onSort }) => {
    const handleSort = (event) => onSort(event.target.value);

    return (
        <div className="w-full lg:w-[25%] gap-5 flex items-center justify-start px-8 py-4 lg:p-8">
            <label htmlFor="sort-name border">Sort Name: </label>
            <select
                id="sort-name"
                className="px-4 py-2 rounded-lg bg-gray-700 text-white"
                onChange={handleSort}
            >
                <option value="">Select</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    );
};

export default SortByName;
