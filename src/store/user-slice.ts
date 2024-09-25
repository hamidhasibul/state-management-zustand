import { StateCreator } from "zustand";

type UserState = {
  username: string;
  fullName: string;
  age: number;
  address: string;
};

type UserAction = {
  setAddress: (address: string) => void;
};

export type UserSlice = UserState & UserAction;

export const createUserSLice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  username: "",
  fullName: "",
  age: 0,
  address: "",
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
});