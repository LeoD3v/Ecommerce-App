import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import SearchBar from "./searchBar";
import { filters, paginationFilter, portalFormState } from "../store/useStore";
import { PaginationType } from "../types";
import { useDebounce } from "use-debounce";
import { useItems } from "../queries/itemsQueries";
import { columns } from "./table/tableContent";
import TableRow from "./table/tableRows";
import TablePagination from "./table/tablePagination";
import TableContent from "./table/tableContent";
import CreateItemBtn from "./table/createItemBtn";
import CreateItemForm from "./createItemForm";

const TableRendering = () => {
  const [columnResizeMode, setColumnResizeMode] = useState("onChange");
  // const [sorting, setSorting] = React.useState<SortingState>([]); needs to be set to zustand
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);needs to be set to zustand
  //|| get the filters from zustand
  const { filter } = filters((state) => ({
    filter: state.filter,
  }));
  const { portal, setPortal } = portalFormState((state) => ({
    portal: state.portal,
    setPortal: state.setPortal,
  }));

  //|| delay the for providing the filter to the tanstack query to perform the fetch on each input
  const [debounceQuery] = useDebounce(filter, 400);

  console.log("debounce", debounceQuery);

  //|| get the pagination from zustand and checks whether is a function or just a value
  const { pagination, setPagination } = paginationFilter<PaginationType>(
    (state) => ({
      pagination: state.pagination,
      setPagination: state.setPagination,
    })
  );

  const { data, error, isLoading } = useItems(
    pagination.pageIndex,
    pagination.pageSize,
    debounceQuery
  );

  const items = data?.items || [];
  const totalItems = data?.totalItems || 0;
  //|| tanstack table instance
  const tableContent = useReactTable({
    data: items,
    columns: columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    columnResizeMode,
    state: {
      // sorting,
      pagination: {
        ...pagination,
        pageSize: pagination.pageSize || 5,
      },
    },
    onColumnResize: setColumnResizeMode,
    // onSortingChange: setSorting,
  });

  function paginationLength(e) {
    const valueAsString = e.target.value;
    console.log("string or nujber", valueAsString);
    const valueToNumber = parseInt(valueAsString, 10);
    if (!isNaN(valueToNumber) && valueToNumber > 0) {
      setPagination((prev) => ({
        ...prev,
        pageSize: valueToNumber,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        pageSize: 10,
      }));
      console.warn("Invalid page size");
      return valueToNumber;
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>{portal === true && <CreateItemForm />}</div>
      <div className=" justify-end flex sticky top-0 bg-white z-10 mr-60">
        <SearchBar />
      </div>
      <div className="relative w-[85%] h-[calc(100vh-9rem)]  flex flex-col m-auto">
        <div className="overflow-y-auto  w-full">
          <table className="min-w-full divide-y  text-start rounded-xl">
            <TableContent tableContent={tableContent} />
            {tableContent.getRowModel().rows.map((row) => {
              return <TableRow key={row.id} rowId={row.id} row={row} />;
            })}
          </table>{" "}
          <CreateItemBtn setPortal={setPortal} />
        </div>
      </div>

      <TablePagination
        paginationLength={paginationLength}
        tableContent={tableContent}
      />
    </>
  );
};
export default TableRendering;
