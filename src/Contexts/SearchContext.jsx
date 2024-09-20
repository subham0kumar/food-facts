import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { productsByName } from "../Config/api";

const searchContext = createContext();
const SearchContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&json=true$page=${page}`
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
      const { data } = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&json=true$page=${page}`
      );
      setProducts(data.products);
    } catch (ex) {
      console.log("error.status:", ex);
    }
    setLoading(false);
  };

  console.log(search);
  return (
    <searchContext.Provider
      value={{
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
