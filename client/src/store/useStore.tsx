import { create } from "zustand";
import { RoleState, FetchItems, Filters } from "../types";
export const useStore = create<RoleState>((set) => ({
  role: {
    admin: false,
  },
  setRole: (admin) =>
    set(() => ({
      role: { admin },
    })),
}));

export const filters = create<Filters>((set) => ({
  filter: "",
  setFilter: (filter) => set(() => ({ filter })),
}));
export const fetchItems = create<FetchItems>((set) => ({
  items: [],
  setItems: (items) => set(() => ({ items })),
}));

export default [filters, useStore, fetchItems];
