import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

export default function SearchBar({ handleChange, placeholder }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-4 lg:p-8">
            <div
                className={`w-full h-12 relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ${isFocused ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-900 to-gray-800'}`}
            >
                <div className="absolute inset-0 flex items-center">
                    <SearchIcon className="w-5 h-5 text-gray-400 ml-3" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full h-full bg-transparent text-gray-100 placeholder-gray-500 text-sm focus:outline-none pl-10 pr-3"
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
                <div
                    className={`absolute inset-0 bg-white transition-opacity duration-300 pointer-events-none ${isFocused ? 'opacity-5' : 'opacity-0'}`}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}