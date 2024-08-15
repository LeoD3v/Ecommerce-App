import { ObjectId } from "mongoose";
// ZUSTAND STORE TYPES

export type Items = {
  name: string;
  price: number;
  _id: ObjectId;
  created_by: ObjectId;
  descriptioni: string;
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
