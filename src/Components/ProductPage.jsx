import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchState } from '../Contexts/SearchContext';
import { Loader } from './Loader/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const { fetchDataOnCodeSearch, singleProduct, loading } = SearchState();

  useEffect(() => {
    fetchDataOnCodeSearch(id, true);  // Pass true to indicate it's for a product page
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{singleProduct.product_name}</h1>
      <img src={singleProduct.image_front_url} alt={singleProduct.product_name} className="mb-4 max-w-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Nutrition Grade</h2>
          <p className="text-lg">{singleProduct.nutrition_grades?.toUpperCase()}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-lg">{singleProduct.categories}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <p className="text-lg">{singleProduct.ingredients_text}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Allergens</h2>
          <p className="text-lg">{singleProduct.allergens || 'None listed'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;