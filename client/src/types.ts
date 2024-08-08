import { ObjectId } from "mongoose";
// ZUSTAND STORE TYPES
export type Items = {
  name: string;
  price: number;
  created_by: string;
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
