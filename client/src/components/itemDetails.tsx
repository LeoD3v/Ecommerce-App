// import { getRouteApi } from "@tanstack/react-router";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { useItemDetails } from "../queries/itemDetailsQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItemDetails } from "../queries/itemDetailsQueries"; 
// import { useItemDetails } from "../queries/itemDetailsQueries";

const ItemDetails = ({ setPortalEdit, portalEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  //   const { portalEdit, setPortalEdit } = portalEditState((state) => ({
  //     portalEdit: state.portalEdit,
  //     setPortalEdit: state.setPortalEdit,
  //   }));
  //   console.log(portalEdit);

  //   const route = getRouteApi("/itemdetails/$id");
  //   const data = route.useLoaderData();
  const { data, isLoading } = useItemDetails(portalEdit.itemId);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    created_by: "",
    price: "",
    model: "",
    brand: "",
    quantity: "",
    serialNumbers: "",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        type: data.type || "",
        name: data.name || "",
        created_by: data.created_by || "",
        price: data.price || "",
        model: data.model || "",
        brand: data.brand || "",
        quantity: data.quantity || "",
        serialNumbers: data.serialNumbers || "",
        description: data.description || "",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (updatedData) => updateItemDetails(portalEdit.itemId, updatedData),
    onSuccess: () => {
      // Invalidate and refetch item details to ensure updated data is displayed
      queryClient.invalidateQueries(["item", portalEdit.itemId]);
      setIsEditing(false); // Exit edit mode on success
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });

  // Handle form submission
  const handleSave = () => {
    mutation.mutate(formData);
  };
  //   if (!data) return <div>Loading...</div>;
 
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center min-h-screen backdrop-blur-sm z-[999] portal-overlay">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border-2 border-blue-500">
        <div
          className="text-right text-blue-500 cursor-pointer mb-4"
          onClick={() => setPortalEdit({ isOpen: false, itemId: null })}
        >
          X
        </div>
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          {isEditing ? "Edit Item" : "View Item"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Type
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="Type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.type || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.name || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Created By
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.created_by}
                  onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
                  placeholder="Created By"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.created_by || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Price
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.price || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Model
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Model"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.model || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Brand
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Brand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.brand || "N/A"}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Quantity
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="Quantity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.quantity || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Serial#
              </label>
              {isEditing ? (
                <textarea
                  value={formData.serialNumbers}
                  onChange={(e) => setFormData({ ...formData, serialNumbers: e.target.value })}
                  placeholder="Enter serial numbers separated by commas"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.serialNumbers || "N/A"}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Description
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="bg-transparent">{data?.description || "N/A"}</p>
              )}
            </div>
            <div className="flex justify-center pt-1">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="rounded-md w-[100%] bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-md w-[100%] bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setPortalEdit({ isOpen: false, itemId: null })}
                className="rounded-md w-[100%] bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
