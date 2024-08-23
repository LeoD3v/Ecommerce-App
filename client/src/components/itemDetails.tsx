// import { getRouteApi } from "@tanstack/react-router";

import React from "react";
import { createPortal } from "react-dom";

import { useItemDetails } from "../queries/itemDetailsQueries";

const ItemDetails = ({ setPortalEdit, portalEdit }) => {
  //   const { portalEdit, setPortalEdit } = portalEditState((state) => ({
  //     portalEdit: state.portalEdit,
  //     setPortalEdit: state.setPortalEdit,
  //   }));
  //   console.log(portalEdit);

  //   const route = getRouteApi("/itemdetails/$id");
  //   const data = route.useLoaderData();
  const { data, isLoading } = useItemDetails(portalEdit.itemId);

  // if (!data) return <div>Loading...</div>;
  if (isLoading) return <div>Loading...</div>;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center min-h-screen  backdrop-blur-sm  z-[999] portal-overlay">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border-2 border-blue-500">
        <div
          className="text-right text-blue-500 cursor-pointer mb-4"
          onClick={() => setPortalEdit({ isOpen: false, itemId: null })}
        >
          X
        </div>
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          View/Edit Item
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={data?.type || ""}
                placeholder="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data?.name || ""}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="createdBy"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Created By
              </label>
              <input
                type="text"
                id="createdBy"
                name="createdBy"
                value={data?.created_by || ""}
                placeholder="created by"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={data?.price || ""}
                placeholder="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={data?.model || ""}
                placeholder="model"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={data?.brand || ""}
                placeholder="brand"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="quantity"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={data?.quantity || ""}
                placeholder="quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="serialNumbers"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Serial#
              </label>
              <textarea
                id="serialNumbers"
                name="serialNumbers"
                value={data?.serialNumbers || ""}
                placeholder="Enter serial numbers separated by commas"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={data?.description || ""}
                placeholder="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                className="rounded-md w-[100%] bg-blue-500 text-white font-bold py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Edit
              </button>
            </div>
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setPortalEdit({ isOpen: false, itemId: null })}
                type="submit"
                className="rounded-md w-[100%] bg-blue-500 text-white font-bold py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ItemDetails;
