import React from "react";
import "./Card.css";

export const Card = ({
  ingredients,
  categories,
  nutrition_grade,
  img_url,
  product_name,
  id,
}) => {
  let shortenedIngredients = ingredients
    ? ingredients.length > 50
      ? ingredients.substring(0, 50) + "..."
      : ingredients
    : "UnKnown";
  return (
    <article
      key={id}
      className="m-auto w-full max-w-[300px] bg-transparent border-2 border-[#fefef477] rounded-xl p-2 text-white"
    >
      <section
        style={{
          backgroundImage: `url(${img_url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-between h-[300px] bg-blend-multiply bg-[#fefe4e20] rounded-t-lg text-xl"
      >
        <header className="m-6 text-yellow-200 card__hero-header">
          {/* <span>{categories ? categories.substring(0, 12) : "NA"}</span> */}{" "}
          <h1>{id}</h1>
          <div className="bg-[#fefe4eb9] text-[#0e0fff] p-3 px-5 rounded-full">
            <h1>{nutrition_grade.toUpperCase()}</h1>
          </div>
        </header>
        <p className="w-full px-2 bg-[#0000006c] text-3xl font-semibold">
          {product_name}
        </p>
      </section>

      <footer class="card__footer">
        <div class="card__job-summary">
          <div class="card__job-icon"></div>
          <div class="card__job">
            <p class="card__job-title">{shortenedIngredients}</p>
          </div>
        </div>

        <button className="bg-[#fefe4eb9] px-3 py-2 text-black rounded-lg">
          view
        </button>
      </footer>
    </article>
  );
};
