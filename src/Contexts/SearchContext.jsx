import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "../Hooks/UseDebounce";

const searchContext = createContext();
const SearchContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/category/{category}.json&page=${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };


  const fetchDataOnSearch = async () => {
    setLoading(true);
    try {
      console.log(debouncedSearch)
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedSearch}&json=true$page=${page}`
      );
      setProducts(data.products);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  return (
    <searchContext.Provider
      value={{
        debouncedSearch,
        fetchData,
        setSearch,
        setPage,
        products,
        loading,
        page,
        search,
        fetchDataOnSearch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContext;

export const SearchState = () => {
  return useContext(searchContext);
};
