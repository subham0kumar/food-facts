import React, { useState } from "react";
import { SearchState } from "../Contexts/SearchContext";

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
    <div className="w-full relative mt-6">

      <input
        type="text"
        placeholder="Search by Name"
        onChange={handleSearch}
        className="text-white text-center block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 transition placeholder:text-neutral-500 focus:border-[#fefef477] focus:outline-none focus:ring-neutral-950/5"

      />
      <input
        type="text"
        placeholder="Search by Barcode"
        onChange={handleCodeSearch}
        className="text-white text-center block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 transition placeholder:text-neutral-500 focus:border-[#fefef477] focus:outline-none focus:ring-neutral-950/5"

      />

    </div>
  );
};
