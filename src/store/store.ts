import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Store } from "@/types/store";
import { createUserSlice } from "@/store/user-slice";
import { createCartSlice } from "@/store/cart-slice";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create<Store>()(
  subscribeWithSelector(
    immer((...a) => ({
      ...createUserSlice(...a),
      ...createCartSlice(...a),
    }))
  )
);
