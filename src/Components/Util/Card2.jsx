import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Card2({
    ingredients,
    nutrition_grade,
    img_url,
    product_name,
    categories,
    id, }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const shortenedText = (text, maxLength = 75) =>
        text ? (text.length > maxLength ? `${text.substring(0, 50)}...` : text) : "Unknown";

    const displayNutritionGrade = nutrition_grade ? nutrition_grade.toUpperCase() : "NOS";

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/product/${id}`);
    };

    return (
        <Link
            to={`/product/${id}`}
            className={`group w-72 h-96 relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ${isHovered ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-900 to-gray-800'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute top-0 bg-gray-700 left-0 w-full h-1/2 overflow-hidden flex items-center justify-center">
                {!img_url || imageError ? (
                    <img
                        src="/broken.svg"
                        alt="Broken Image"
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    <img
                        src={img_url}
                        alt={product_name}
                        className={`max-h-full max-w-full object-contain transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                            }`}
                        onError={() => setImageError(true)}
                    />
                )}
                <div className="flex gap-2 absolute bottom-0 left-0 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-tr-md">
                    <h3 className='font-normal'>Nutrition Grade:</h3> {displayNutritionGrade}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold mb-2 mr-16">{product_name}</h2>
                    <p className="mt-4 text-xs text-gray-400 line-clamp-3 flex gap-2">
                        <span className='font-bold'>Ingredients:</span> {shortenedText(ingredients)}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-3 pt-2 flex gap-2">
                        <span className='font-bold'>Category:</span> {shortenedText(categories)}
                    </p>
                </div>
                <div className="text-xs text-gray-400 mt-2">ID: {id}</div>

                <button
                    className="absolute top-2 right-2 lg:rotate-0 -rotate-45 lg:bg-transparent bg-gray-950 group-hover:-rotate-45 group-hover:bg-gray-950 rounded-full p-2 w-12 h-12 transition-all duration-300 ease-in-out"
                >
                    <svg
                        style={{ color: "#3f37e0" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        color="black"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                    >
                        <line y2="12" x2="19" y1="12" x1="5"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>

            </div>
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-10' : 'opacity-0'
                    }`}
            />
        </Link>
    );
}