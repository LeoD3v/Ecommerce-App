import { flexRender } from "@tanstack/react-table";
import React from "react";
import ColumnFilter from "./columnFilter";
function canFilterColumn(column) {
  return column.columnDef.meta?.enableFiltering ?? false;
}
export const columns = [
  {
    accessorKey: "rowNumber",
    header: () => "#",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: { enableFiltering: true },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    meta: { enableFiltering: true },
  },
  {
    accessorKey: "model",
    header: "Model",
    meta: { enableFiltering: true },
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Qt",
  },
  {
    accessorKey: "createdAt",
    header: () => "Date Created",
    cell: (info) => {
      const data = new Date(info.getValue());
      return data.toLocaleDateString();
    },
  },
];

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
                {canFilterColumn(header.column) ? ( // Use the utility function here
                  <div>
                    <ColumnFilter column={header.column} />
                  </div>
                ) : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    </>
  );
}
