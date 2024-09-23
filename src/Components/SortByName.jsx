import React from 'react';

const SortByName = ({ onSort }) => {
    const handleSort = (event) => {
        onSort(event.target.value);
    };

    return (
        <div className="lg:w-[25%] w-1/2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white">
            <label htmlFor="sort-name">Sort by Name: </label>
            <select id="sort-name" className='px-4 py-2 rounded-lg bg-gray-800 text-white' onChange={handleSort}>
                <option value="">Select</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    );
};

export default SortByName;
