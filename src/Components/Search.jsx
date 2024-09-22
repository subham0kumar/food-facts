import React, { useState } from "react";
import { SearchState } from "../Contexts/SearchContext";
import SearchBar from "./SearchBar";

export const Search = () => {
  const { setSearch } = SearchState();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  const { setCodeSearch } = SearchState();
  const handleCodeSearch = (e) => {
    setCodeSearch(e.target.value);
  }
  return (
    <div className="w-full flex relative mt-6">
      <SearchBar placeholder="Search by Name" handleChange={handleSearch} />
      <SearchBar placeholder="Search by Barcode" handleChange={handleCodeSearch} />
    </div>
  );
};
