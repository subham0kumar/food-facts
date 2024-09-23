import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "../Hooks/UseDebounce";

// Created a context for search
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

  // Debounced values for search and code search
  const debouncedSearch = useDebounce(search, 500);
  const debouncedCode = useDebounce(codeSearch, 500);

  // Fetch data for all products
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

  // Fetch data by selected category
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

  // Fetch data based on search input
  const fetchDataOnSearch = async () => {
    setLoading(true);
    setProducts([]);
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedSearch}&json=1&page=${page}`;
      const { data } = await axios.get(url);
      setProducts(data.products || []);
    } catch (ex) {
      console.error("Error fetching data:", ex);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on product code
  const fetchDataOnCodeSearch = async (code, isProductPage = false) => {
    setLoading(true);
    setProducts([]);
    setSingleProduct(null);
    setProductAvailable(true);

    try {
      const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`;
      const response = await axios.get(url);

      if (response.data && response.data.status === 1 && response.data.product) {
        setSingleProduct(response.data.product);
        if (!isProductPage) {
          setProducts([response.data.product]);
        }
      } else {
        setProductAvailable(false);
      }
    } catch (ex) {
      console.error("Error fetching data:", ex);
      setProductAvailable(false);
    } finally {
      setLoading(false);
    }
  };

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
export const SearchState = () => useContext(searchContext);
