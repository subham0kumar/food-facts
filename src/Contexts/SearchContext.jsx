import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "../Hooks/UseDebounce";
import { productsByBarcode, productsByName } from "../Config/api";

// Create a context for search-related state and functions
const searchContext = createContext();

const SearchContext = ({ children }) => {
  // State variables
  const [search, setSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");
  const [category, setCategory] = useState("-");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);

  // Debounced search values to reduce API calls
  const debouncedSearch = useDebounce(search, 500);
  const debouncedCode = useDebounce(codeSearch, 500);

  // Fetch products by category
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/category/${category}.json&page=${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  // Fetch products based on search term
  const fetchDataOnSearch = async () => {
    setLoading(true);
    try {
      console.log(debouncedSearch)
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedSearch}&json=1&page=${page}`;
      if (!url) {
        throw new Error('Invalid URL generated');
      }
      const { data } = await axios.get(url);
      setProducts(data.products || []);
    } catch (ex) {
      console.error("Error fetching data:", ex);
      setProducts([]);
    }
    setLoading(false);
  };

  // Fetch a single product by barcode
  const fetchDataOnCodeSearch = async (code, isProductPage = false) => {
    setLoading(true);
    try {
      console.log(code);
      const url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;
      if (!url) {
        throw new Error('Invalid URL generated');
      }
      const { data } = await axios.get(url);
      if (data.status === 1) {
        if (isProductPage) {
          setSingleProduct(data.product);
        } else {
          setProducts([data.product]); // Set products to an array with single product
          setSingleProduct(data.product);
        }
      } else {
        if (isProductPage) {
          setSingleProduct(null);
        } else {
          setProducts([]); // Clear products if no result
          setSingleProduct(null);
        }
      }
    } catch (ex) {
      console.error("Error fetching data:", ex);
      if (isProductPage) {
        setSingleProduct(null);
      } else {
        setProducts([]);
        setSingleProduct(null);
      }
    }
    setLoading(false);
  };

  // Provide the context value to children components
  return (
    <searchContext.Provider
      value={{
        fetchData,
        fetchDataOnSearch,
        fetchDataOnCodeSearch,
        search,
        setSearch,
        codeSearch,
        setCodeSearch,
        category,
        setCategory,
        page,
        setPage,
        products,
        loading,
        debouncedSearch,
        debouncedCode,
        singleProduct,
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
