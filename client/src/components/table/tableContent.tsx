import { flexRender } from "@tanstack/react-table";
import React from "react";

export default function TableContent({ tableContent }) {
  return (
    <>
      <thead className="bg-blue-500  sticky top-0 z-10 shadow-xl">
        {tableContent.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-center   text-white text-xs font-medium  uppercase tracking-wider border border-gray-300"
              >
                <div>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
    </>
  );
}
