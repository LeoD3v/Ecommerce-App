import { create } from "zustand";

interface Items {
  name: string;
  price: number;
  created_by: {
    user: string;
  };
}

interface RoleState {
  role: {
    admin: boolean;
  };
  setRole: (admin: boolean) => void;
  items: Items[];
  setItems: (items: Items[]) => void;
}

const useStore = create<RoleState>((set) => ({
  role: {
    admin: false,
  },
  setRole: (admin) =>
    set(() => ({
      role: { admin },
    })),
  items: [],
  setItems: (items) => set(() => ({ items })),
}));
export default useStore;
