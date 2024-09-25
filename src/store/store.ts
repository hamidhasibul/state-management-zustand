import { create } from "zustand";
import { Store } from "@/types/store";
import { createUserSLice } from "@/store/user-slice";
import { immer } from "zustand/middleware/immer";

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createUserSLice(...a),
  }))
);
