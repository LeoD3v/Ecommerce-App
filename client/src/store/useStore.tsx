import { create } from "zustand";

interface RoleState {
  role: {
    admin: boolean;
  };
  setRole: (admin: boolean) => void;
}

const useStore = create<RoleState>((set) => ({
  role: {
    admin: false,
  },
  setRole: (admin) =>
    set(() => ({
      role: { admin },
    })),
}));
export default useStore;
