import React, { useState } from "react";

export default function ColumnFilter({ column }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    column.setFilterValue(value);
  };
  return (
    <div className="pt-1">
      {" "}
      <input
        className="text-black pl-2 rounded-sm w-28"
        value={inputValue} // Display the current filter value
        onChange={handleChange} // Update filter value on input change
        placeholder={`Search...`} // Placeholder with column name
      />
    </div>
  );
}
