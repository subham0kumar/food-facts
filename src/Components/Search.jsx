import React, { useState } from "react";
import { SearchState } from "../Contexts/SearchContext";

export const Search = () => {
  const { setSearch } = SearchState();
  return (
    <div className="relative mt-6">
      <input
        type="text"
        placeholder="Search by Name"
        onChange={(e) => setSearch(e.target.value)}
        className="text-white text-center block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 transition placeholder:text-neutral-500 focus:border-[#fefef477] focus:outline-none focus:ring-neutral-950/5"
      />
      {/* <div className="absolute inset-y-1 right-1 flex justify-end">
        <button
          onSubmit={handleSubmit}
          type="submit"
          className="flex aspect-square h-full items-center justify-center rounded-xl bg-[#fefe4eb9] text-white transition hover:bg-[#fefe4e99]"
        >
          <h1>🔍</h1>
        </button>
      </div> */}
    </div>
  );
};
