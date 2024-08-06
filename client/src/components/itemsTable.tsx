import { ObjectId } from "mongoose";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type userBasicInfo = {
  _id: ObjectId;
  name: string;
  items: Items[];
  createdAt: Date;
  updatedAt: Date;
};
export type Items = {
  name: string;
  price: number;
  created_by: string;
  createdAt: Date;
  updatedAt: Date;
};

async function fetchItems() {
  try {
    const response = await fetch("http://localhost:5005/api/items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Failed to fetch items:", error);
  }
  return [];
}

const columnHelper = createColumnHelper<Items>();

const columns = [
  columnHelper.display({
    id: "rowNumber",
    header: () => "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("created_by", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date Created",
    cell: (info) => info.getValue(),
  }),
];

const ItemsTable = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
  const tableContent = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });
  // console.log(tableContent.)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(tableContent.getHeaderGroups());
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          {tableContent.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
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
        <tbody className="bg-white divide-y divide-gray-200">
          {tableContent.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
