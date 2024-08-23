import React, { ChangeEvent, useState } from "react";

export default function ColumnFilter({ column }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    column.setFilterValue(value);
  };
  return (
    <div className="pt-1">
      {" "}
      <input
        className="text-black pl-2 rounded-sm w-28"
        value={inputValue}
        onChange={handleChange}
        placeholder={`Search...`}
      />
    </div>
  );
}
