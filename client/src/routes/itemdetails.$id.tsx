import { createFileRoute } from "@tanstack/react-router";
import ItemDetails from "../components/itemDetails";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const fetchItemDetails = async (id: string) => {
  const response = await fetch(`/api/itemdetails/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }
  const data = await response.json();
  console.log(data);
  return data;
};
export interface ItemDetailsParams {
  id: string;
}
export const Route = createFileRoute("/itemdetails/$id")({
  loader: async ({ params }: { params: ItemDetailsParams }) => {
    const data = await fetchItemDetails(params.id);
    console.log("aaa", data);
    return data;
  },
  component: () => <ItemDetails />,
});
