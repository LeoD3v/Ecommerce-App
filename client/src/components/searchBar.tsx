import React, { useEffect, useRef, useState } from "react";
import { filters } from "../store/useStore";

function SearchBar() {
  const { setFilter, filter } = filters((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
  }));
  //   const inputRef = useRef(null);
  const [searchInputValue, setInputSearchValue] = useState("");

  const clearSearch = () => {
    setInputSearchValue("");
    setFilter("");
  };
  //   useEffect(() => {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   }, []);
  return (
    <div className="py-2 text-right flex justify-end flex-row ">
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-1">
        <div>
          <label htmlFor="search">
            <input
              //   ref={inputRef}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              name="search"
              placeholder="Search"
              className="divide-y divide-gray-200 border border-gray-400 pl-2"
            />
          </label>
        </div>
        <div>
          <button
            onClick={clearSearch}
            className="px-1 divide-y divide-gray-200 border border-gray-400"
            type="button"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
