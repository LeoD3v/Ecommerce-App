import React from "react";
import { flexRender } from "@tanstack/react-table";
import { portalEditState } from "../../store/useStore";
import { Items } from "../../types";
import ItemDetails from "../itemDetails";
export default function TableRow({ row, rowId }) {
  //|| get the portal to edit items from zustand
  const { portalEdit, setPortalEdit } = portalEditState((state) => ({
    portalEdit: state.portalEdit,
    setPortalEdit: state.setPortalEdit,
  }));
  const handleMouseUp = (rowData) => {
    const selection = window.getSelection()?.toString();
    console.log("what is this ", selection);
    if (!selection) {
      handleRowClick(rowData);
    }
  };
  function handleRowClick(rowData: Items) {
    if (!rowData._id) {
      throw new Error("ID was not found");
    }
    const itemId = rowData._id;
    console.log("Row clicked, ID:", itemId);
    setPortalEdit({ isOpen: true, itemId: itemId });
  }
  return (
    <>
      <>
        {portalEdit.isOpen === true && (
          <ItemDetails setPortalEdit={setPortalEdit} portalEdit={portalEdit} />
        )}
      </>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr
          key={rowId}
          className={`hover:bg-blue-100 cursor-pointer ${
            row.id % 2 === 0
              ? "bg-gray-200 sticky top-5"
              : "bg-white sticky top-5"
          }`}
          onClick={() => handleMouseUp(row.original)}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={`${rowId} + ${cell.id}`}
              className=" px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 border border-gray-300 "
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      </tbody>
    </>
  );
}
