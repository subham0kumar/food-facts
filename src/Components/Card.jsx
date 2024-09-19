import React from "react";
import "./Card.css";

const Card = ({
  ingredients,
  categories,
  nutrition_grade,
  img_url,
  product_name,
  id,
}) => {
  return (
    <div className="card">
      <div className="card-image"></div>
      <div className="category"> {nutrition_grade} </div>
      <div className="heading">
        {product_name}
        <div className="author">
          {" "}
          By <span className="name">Subham</span> 4 days ago
        </div>
      </div>
    </div>
  );
};

export default Card;
