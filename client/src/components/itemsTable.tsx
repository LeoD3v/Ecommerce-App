import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "./searchBar";
import {
  filters,
  ItemsState,
  paginationFilter,
  portalFormState,
} from "../store/useStore";
import { Items, PaginationType } from "../types";
import { useDebounce } from "use-debounce";
import MyIcon from "./addIcon";
import CreateItemForm from "./createItemForm";
import { useNavigate } from "@tanstack/react-router";
import ItemDetails from "./itemDetails";
async function fetchItems(
  filter: string,
  pageIndex: number,
  pageSize: number
): Promise<{ items: Items[]; totalItems: number }> {
  try {
    const offset = pageIndex * pageSize;
    console.log(
      `Fetching items with query: http://localhost:5005/api/items?name_like=${filter}&_start=${offset}&_limit=${pageSize}`
    );
    const response = await fetch(
      `http://localhost:5005/api/items?name_like=${filter}&_start=${offset}&_limit=${pageSize}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { items, totalItems } = await response.json();

    console.log(items);
    return { items, totalItems };
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return { items: [], totalItems: 0 };
  }
}

const columnHelper = createColumnHelper<Items>();

const columns = [
  columnHelper.display({
    id: "rowNumber",
    header: () => "#",
    cell: (info) => info.row.index + 1,
  }),
  columnHelper.accessor("brand", {
    header: () => "Brand",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: () => "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("_id", {
    header: () => "Id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("model", {
    header: () => "model",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: () => "Qt",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date Created",
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString();
    },
  }),
];

const ItemsTable = () => {
  const navigate = useNavigate({ from: "/dashboard" });
  const { filter } = filters((state) => ({
    filter: state.filter,
  }));
  // const { items, setItems } = ItemsState((state) => ({
  //   items: state.items,
  //   setItems: state.items,
  // }));
  const [debounceQuery] = useDebounce(filter, 400);
  // console.log("this is the filter from table compoinent", filter);
  const { portal, setPortal } = portalFormState((state) => ({
    portal: state.portal,
    setPortal: state.setPortal,
  }));

  const { pagination, setPagination } = paginationFilter<PaginationType>(
    (state) => ({
      pagination: state.pagination,
      setPagination: state.setPagination,
    })
  );
  const queryClient = useQueryClient();

  const {
    data = { items: [], totalItems: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "items",
      // filter,
      pagination.pageIndex,
      pagination.pageSize,
      debounceQuery,
    ],
    queryFn: () =>
      fetchItems(debounceQuery, pagination.pageIndex, pagination.pageSize),
    staleTime: 0,
    placeholderData: { items: [], totalItems: 0 },
  });

  const tableContent = useReactTable({
    data: data.items,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data.totalItems / pagination.pageSize),
    state: {
      pagination,
    },
  });

  function paginationLength(e) {
    const valueAsString = e.target.value;
    const valueToNumber = parseInt(valueAsString, 10);
    if (!isNaN(valueToNumber) && valueToNumber > 0) {
      setPagination((prev) => ({
        ...prev,
        pageSize: valueToNumber,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        pageSize: 12,
      }));
      console.warn("Invalid page size");
    }
  }

  function handleRowClick(rowData) {
    // Assuming rowData contains the entire data object for the clicked row
    const itemId = rowData._id; // Access the ID or other properties
    console.log("Row clicked, ID:", itemId);

    // Perform any action, such as navigating to a detailed view
    // For example, you might use React Router to navigate to a detailed page:
    navigate({ to: `/itemdetails/${itemId}` });
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>{portal === true && <CreateItemForm />}</div>
      <div>{portal === true && <ItemDetails />}</div>
      <div className=" justify-end flex sticky top-0 bg-white z-10 mr-60">
        <SearchBar />
      </div>
      <div className="relative w-[85%] h-[calc(100vh-9rem)]  flex flex-col m-auto">
        <div className="overflow-y-auto  w-full">
          <table className="min-w-full divide-y  text-start rounded-xl">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {tableContent.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={
                    rowIndex % 2 === 0
                      ? "bg-gray-200 sticky top-5"
                      : "bg-white sticky top-5"
                  }
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className=" px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 border border-gray-300 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className=" absolute top-[-24px] right-[-16px] z-20 ">
            <button
              className="block  rounded-full border-2 border-white bg-white hover:border-blue-600 focus:outline-none shadow-xl"
              onClick={setPortal}
            >
              <MyIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="pagination-controls flex items-center justify-center gap-12">
        <div>
          <button
            className="pr-4 font-semibold text-blue-500"
            onClick={() => tableContent.previousPage()}
            disabled={!tableContent.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="pr-4 font-semibold text-blue-500"
            onClick={() => tableContent.nextPage()}
            disabled={!tableContent.getCanNextPage()}
          >
            Next
          </button>
          <span className="pr-4 font-semibold text-gray-500">
            Page {tableContent.getState().pagination.pageIndex + 1} of{" "}
            {tableContent.getPageCount()}
          </span>{" "}
        </div>
        <span className="font-semibold text-gray-500">
          Page size:{" "}
          {
            <>
              <label htmlFor="numberSelect"></label>
              <select
                className="font-semibold text-blue-500"
                id="numberSelect"
                name="numberSelect"
                onChange={paginationLength}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </>
          }
        </span>
      </div>
    </>
  );
};

export default ItemsTable;
