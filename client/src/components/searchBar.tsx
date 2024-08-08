import React, { useState } from "react";
import { filters } from "../store/useStore";

function SearchBar() {
  const { setFilter, filter } = filters((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
  }));

  //   const [searchValue, setSearchValue] = useState("");
  const [searchInputValue, setInputSearchValue] = useState("");

  const submitSearchForm = (event) => {
    event.preventDefault();

    setFilter(searchInputValue);
    console.log("filter set to", searchInputValue);
    setInputSearchValue("");
  };
  console.log(searchInputValue);
  return (
    <div className="py-2 text-right flex justify-end flex-row">
      <form onSubmit={submitSearchForm} className="flex gap-1">
        <div>
          <label htmlFor="search">
            <input
              onChange={(e) => setInputSearchValue(e.target.value)}
              value={searchInputValue}
              name="search"
              placeholder="Search"
              className="divide-y divide-gray-200 border border-gray-400 pl-2"
            />
          </label>
        </div>
        <div>
          <button
            className="px-1 divide-y divide-gray-200 border border-gray-400"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
