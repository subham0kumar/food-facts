import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({
  ingredients,
  nutrition_grade,
  img_url,
  product_name,
  id,
}) => {
  const shortenedIngredients = ingredients
    ? ingredients.length > 50
      ? `${ingredients.substring(0, 50)}...`
      : ingredients
    : "Unknown";

  const displayNutritionGrade = nutrition_grade ? nutrition_grade.toUpperCase() : "NOS";

  return (
    <article className="m-auto w-full max-w-[300px] bg-transparent border-2 border-[#fefef477] rounded-xl p-2 text-white">
      <div
        style={{
          backgroundImage: `url(${img_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-between h-[300px] bg-blend-multiply bg-[#fefe4e20] rounded-t-lg text-xl"
      >
        <div className="m-6 text-yellow-200 card__hero-header">
          <h2>{id}</h2>
          <div className="bg-[#fefe4eb9] text-[#0e0fff] p-3 px-5 rounded-full">
            <span>{displayNutritionGrade}</span>
          </div>
        </div>
        <h1 className="w-full p-2 bg-[#0000006c] text-3xl font-semibold">
          {product_name}
        </h1>
      </div>

      <span className="flex justify-between items-center py-4 px-1">
        <p className="card__ingredients"><h4>Ingredients:</h4>{shortenedIngredients}</p>
        <Link
          to={`/product/${id}`}
          className="bg-[#fefe4eb9] px-3 py-2 text-black rounded-lg"
        >
          View
        </Link>
      </span>
    </article>
  );
};
