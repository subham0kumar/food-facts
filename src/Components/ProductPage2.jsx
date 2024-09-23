import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchState } from '../Contexts/SearchContext';
import { Loader } from './Loader/Loader';
import Navbar from './Navbar';


export default function ProductPage2() {
    // const [product, setProduct] = useState(null)
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

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
    const displayNutritionGrade = singleProduct.nutrition_grade ? singleProduct.nutrition_grade.toUpperCase() : "NOS";

    const getGradeClass = (grade) => {
        const grades = {
            a: 'bg-green-500',
            b: 'bg-lime-500',
            c: 'bg-yellow-500',
            d: 'bg-orange-500',
            e: 'bg-red-500'
        }
        return grades[grade.toLowerCase()] || 'bg-gray-400'
    }

    // Create an array of nutriment objects
    const nutriments = singleProduct.nutriments || {};
    const nutrimentArray = [
        { name: 'Energy', value: nutriments.energy_100g, unit: 'kcal' },
        { name: 'Carbohydrates', value: nutriments.carbohydrates_100g, unit: 'g' },
        { name: 'Fat', value: nutriments.fat_100g, unit: 'g' },
        { name: 'Proteins', value: nutriments.proteins_100g, unit: 'g' },
        { name: 'Salt', value: nutriments.salt_100g, unit: 'g' },
        { name: 'Fiber', value: nutriments.fiber_100g, unit: 'g' },
        // Add more nutriments as needed
    ].map(item => ({
        ...item,
        value: item.value !== undefined ? Number(item.value).toFixed(2) : 'N/A'
    }));

    return (
        <> <Navbar />
            <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
                <div className="mt-24 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src={singleProduct.image_front_url}
                                    alt={singleProduct.product_name}
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-100">{singleProduct.product_name}</h1>
                                    <p className="text-xl text-gray-400">{singleProduct.brands}</p>
                                    <p className="text-xl text-gray-400">Barcode: {id}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className={`w-16 h-16 ${getGradeClass(displayNutritionGrade)} rounded-full flex items-center justify-center`}>
                                        <span className="text-2xl font-bold text-white">{displayNutritionGrade.toUpperCase()}</span>
                                    </div>
                                    <p className="text-lg text-gray-300">Nutrition Grade</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-200">Ingredients</h2>
                                    <p className="text-gray-400">{singleProduct.ingredients_text}</p>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-2 text-gray-200">Labels</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {singleProduct.labels_old?.split(',')?.map((label, index) => (
                                            <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                                                {label.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-200">Nutritional Values (per 100g)</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {nutrimentArray.map((nutriment, index) => (
                                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-2">{nutriment.name}</h3>
                                        <p>{nutriment.value} {nutriment.unit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}