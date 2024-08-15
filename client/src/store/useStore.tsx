import { create } from "zustand";
import {
  RoleState,
  FetchItems,
  Filters,
  PaginationType,
  PortalType,
} from "../types";
import { PaginationState } from "@tanstack/react-table";
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
export const ItemsState = create<FetchItems>((set) => ({
  items: [],
  setItems: (items) => set(() => ({ items })),
}));

export const paginationFilter = create<PaginationType>((set) => ({
  pagination: { pageIndex: 0, pageSize: 12 },
  setPagination: (updaterOrValue) =>
    set((state) => ({
      pagination:
        typeof updaterOrValue === "function"
          ? updaterOrValue(state.pagination)
          : updaterOrValue,
    })),
}));

export const portalFormState = create<PortalType>((set) => ({
  portal: false,
  setPortal: () => set((state) => ({ portal: !state.portal })),
}));
export default [
  filters,
  useStore,
  ItemsState,
  paginationFilter,
  portalFormState,
];
