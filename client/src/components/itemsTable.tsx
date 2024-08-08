import React, { useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "./searchBar";
import { filters } from "../store/useStore";
import { Items } from "../types";

async function fetchItems(filter: string) {
  try {
    console.log(
      `Fetching items with query: http://localhost:5005/api/items?name=${filter}`
    );
    const response = await fetch(
      `http://localhost:5005/api/items?name_like=${filter}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    console.log(items);
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
  const { filter } = filters((state) => ({
    filter: state.filter,
  }));
  console.log("this is the filter from table compoinent", filter);
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", filter],
    queryFn: () => fetchItems(filter),
    staleTime: 0,
  });

  const tableContent = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("Query Key:", ["items", filter]);
  console.log("Data after fetch:", data);
  // console.log("Row model:", tableContent.getRowModel());
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto p-4">
      <SearchBar />

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
