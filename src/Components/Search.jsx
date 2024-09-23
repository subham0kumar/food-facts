import React, { useState } from "react";
import { SearchState } from "../Contexts/SearchContext";
import SearchBar from "./SearchBar";

export const Search = () => {
  const { setSearch, setCodeSearch } = SearchState();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  const handleCodeSearch = (e) => {
    setCodeSearch(e.target.value);
  }
  return (
    <div className="bg-transparent w-full flex relative mt-6">
      <SearchBar placeholder="Search by Name" handleChange={handleSearch} />
      <SearchBar placeholder="Search by Barcode" handleChange={handleCodeSearch} />
    </div>
  );
};
