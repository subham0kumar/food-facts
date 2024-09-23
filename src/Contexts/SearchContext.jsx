import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "../Hooks/UseDebounce";

// Create a context for search-related state and functions
const searchContext = createContext();

const SearchContext = ({ children }) => {
  // State variables
  const [search, setSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [productAvailable, setProductAvailable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Debounced search values to reduce API calls
  const debouncedSearch = useDebounce(search, 500);
  const debouncedCode = useDebounce(codeSearch, 500);

  // Fetch products by category
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/category/-.json&page=${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  const fetchDataByCategory = async () => {
    setLoading(true);
    setProducts([]);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/category/${selectedCategory}.json&page=${page}`
      );
      setProducts(data.products || []);
    } catch (ex) {
      console.log("Error fetching data:", ex);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products based on search term
  const fetchDataOnSearch = async () => {
    setLoading(true);
    setProducts([]); // Clear the product list before fetching
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(debouncedSearch)}&json=1&page=${page}`;
      const { data } = await axios.get(url);
      setProducts(data.products || []);
    } catch (ex) {
      console.error("Error fetching data:", ex);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single product by barcode
  const fetchDataOnCodeSearch = async (code, isProductPage = false) => {
    setLoading(true);
    setProducts([]); // Clear the product list before fetching
    setSingleProduct(null); // Clear the single product before fetching
    setProductAvailable(true); // Reset product availability

    try {
      const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`;
      console.log("Fetching from URL:", url);
      const response = await axios.get(url);
      console.log("API Response:", response.data);

      if (response.data && response.data.status === 1 && response.data.product) {
        console.log("Product found:", response.data.product);
        setSingleProduct(response.data.product);
        if (!isProductPage) {
          setProducts([response.data.product]);
        }
      } else {
        console.log("Product not found or invalid response");
        setProductAvailable(false);
      }
    } catch (ex) {
      console.error("Error fetching data:", ex);
      console.error("Error details:", ex.response ? ex.response.data : "No response data");
      setProductAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  // Provide the context value to children components
  return (
    <searchContext.Provider
      value={{
        fetchData,
        fetchDataOnSearch,
        fetchDataOnCodeSearch,
        fetchDataByCategory,
        search,
        setSearch,
        codeSearch,
        setCodeSearch,
        page,
        setPage,
        products,
        loading,
        debouncedSearch,
        debouncedCode,
        singleProduct,
        productAvailable,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContext;

// Custom hook to use the search context
export const SearchState = () => {
  return useContext(searchContext);
};
