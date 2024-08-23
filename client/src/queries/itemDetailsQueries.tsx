import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const updateItemDetails = async (id: string, updatedData: Partial<Items>): Promise<Items> => {
  const response = await fetch(`/api/itemdetails/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  const data = await response.json();
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

export const useUpdateItemDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }: { id: string, updatedData: Partial<Items> }) => updateItemDetails(id, updatedData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["item", variables.id]);
    },
    onError: (error) => {
      console.error("Error updating item:", error);
    },
  });
};
