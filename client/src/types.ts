import { ObjectId } from "mongoose";

export type Items = {
  name: string;
  price: number;
  _id: ObjectId;
  created_by: string;
  description: string;
  quantity: number;
  type: "electronics" | "non-electronis";
  brand: string;
  model: string;
  serialNumbers: number[];
  createdAt: Date;
  updatedAt: Date;
};

export interface RoleState {
  role: {
    admin: boolean;
  };
  setRole: (admin: boolean) => void;
}

export interface FetchItems {
  items: Items[];
  setItems: (items: Items[]) => void;
}

export interface Filters {
  filter: string;
  setFilter: (filter: string) => void;
}

export interface UserBasicInfo {
  _id: ObjectId;
  name: string;
  items: Items[];
  createdAt: Date;
  updatedAt: Date;
}

import { PaginationState } from "@tanstack/react-table";

export interface PaginationType {
  pagination: PaginationState;
  setPagination: (
    updaterOrValue:
      | PaginationState
      | ((prev: PaginationState) => PaginationState)
  ) => void;
}

export interface PortalType {
  portal: boolean;
  setPortal: () => void;
}
export interface PortalEditType {
  portalEdit: { isOpen: boolean; itemId: ObjectId | null };
  setPortalEdit: (payload: {
    isOpen: boolean;
    itemId: ObjectId | null;
  }) => void;
}

export interface ColumnFilter {
  id: string;
  value: unknown;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ColumnFiltersState = ColumnFilter[];
