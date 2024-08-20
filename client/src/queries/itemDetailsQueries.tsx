import { useQuery } from "@tanstack/react-query";
import { Items } from "../types";

export const fetchItemDetails = async (id: string): Promise<Items> => {
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

export const useItemDetails = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => fetchItemDetails(id),
    staleTime: 0,
  });
};
