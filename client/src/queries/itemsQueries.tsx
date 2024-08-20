import { useQuery } from "@tanstack/react-query";
import { Items } from "../types";

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
export const useItems = (
  pageIndex: number,
  pageSize: number,
  debounceQuery: string
) => {
  return useQuery({
    queryKey: ["items", pageIndex, pageSize, debounceQuery],
    queryFn: () => fetchItems(debounceQuery, pageIndex, pageSize),
    staleTime: 0,
    placeholderData: { items: [], totalItems: 0 },
  });
};
