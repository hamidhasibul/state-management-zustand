import { CartProduct } from "@/types/cart";
import { Product } from "@/types/product";
import { Store } from "@/types/store";
import { StateCreator } from "zustand";

type CartState = {
  products: CartProduct[];
  totalPrice: number;
};
type CartAction = {
  // Add Product
  addProduct: (product: Product) => void;
  //   Remove Product
  removeProduct: (productId: string) => void;
  //   Inc Qty
  incQty: (productId: string) => void;
  //   Dec Qty
  decQty: (productId: string) => void;
  //   Get product by id
  getProductById: (productId: string) => CartProduct | undefined;
  //   Set Total
  setTotalPrice: (total: number) => void;
  //   Reset Cart
  resetCart: () => void;
};

export type CartSlice = CartState & CartAction;

const initialState: CartState = {
  products: [],
  totalPrice: 0,
};

export const createCartSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,

  //   Inc Qty

  incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.id === productId
      );

      if (foundProduct) {
        foundProduct.qty++;
      }
    }),

  // Dec Qty

  decQty: (productId) =>
    set((state) => {
      const foundIdx = state.products.findIndex(
        (product) => product.id === productId
      );

      if (foundIdx !== -1) {
        if (state.products[foundIdx].qty === 1) {
          state.products.splice(foundIdx, 1);
        } else {
          state.products[foundIdx].qty--;
        }
      }
    }),

  // Add Product

  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, qty: 1 });
    }),

  // Remove Product

  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    }),

  // Get Product by id
  getProductById: (productId) =>
    get().products.find((product) => product.id === productId),

  //   Set Total Price
  setTotalPrice: (total) =>
    set((state) => {
      state.totalPrice = total;
    }),

  // Reset Cart

  resetCart: () => set(() => ({ products: [], totalPrice: 0 })),
});
