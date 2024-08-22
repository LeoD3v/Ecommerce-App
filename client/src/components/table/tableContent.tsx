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
    enableSorting: false,
    enableResizing: true,
    minSize: 10,
    size: 50,
    maxSize: 100,
  },
  {
    accessorKey: "_id",
    header: "ID",
    enableSorting: false,
    enableResizing: true,
    minSize: 30,
    size: 130,
    maxSize: 300,
  },
  {
    accessorKey: "type",
    header: "type",
    enableSorting: false,
    enableResizing: true,
    minSize: 30,
    size: 20,
    maxSize: 400,
  },
  {
    accessorKey: "name",
    header: "Name",
    meta: { enableFiltering: true, sortDescFirst: false },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    meta: { enableFiltering: true },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
  },
  {
    accessorKey: "model",
    header: "Model",
    meta: { enableFiltering: true, enableSorting: true },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
  },

  {
    accessorKey: "price",
    header: "Price",
    meta: { enableSorting: true },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
  },
  {
    accessorKey: "quantity",
    header: "Qt",
    meta: { enableSorting: true },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
  },
  {
    accessorKey: "createdAt",
    header: () => "Date Created",
    cell: (info) => {
      const data = new Date(info.getValue());
      return data.toLocaleDateString();
    },
    meta: { enableSorting: true },
    enableResizing: true,
    minSize: 30,
    size: 10,
    maxSize: 400,
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
                style={{
                  width: header.getSize(),
                  minWidth: "50px", // Ensure there's a minimum width
                  maxWidth: "400px",
                }}
                className={`relative px-6 py-3 text-center resizer  text-white text-xs font-medium  uppercase tracking-wider border border-gray-300`}
              >
                {" "}
                <div
                  className={`${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                  onClick={
                    (console.log("sorting Toogled"),
                    header.column.getToggleSortingHandler())
                  }
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                      : undefined
                  }
                >
                  <div className="flex row items-center justify-center ">
                    <p>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          className="absolute right-0 top-0 h-full w-1 bg-gray-400 hover:bg-gray-600 cursor-col-resize"
                        />
                      )}
                    </p>

                    <p className="ml-1">
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </p>
                  </div>
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
