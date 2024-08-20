import React from "react";

export default function TablePagination({ tableContent, paginationLength }) {
  const currentPageSize = tableContent.getState().pagination.pageSize;
  return (
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
              value={currentPageSize}
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
  );
}
