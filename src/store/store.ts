import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "@/features/auth/store/auth.slice";
import { cartReducer, CartState } from "@/features/cart/store/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { wishlistReducer, WishlistState } from "@/features/wishlist/store/wishlist.slice";
import { addressReducer, AddressState } from "@/features/profile/store/address.slice";

export type PreloadedState = {
  auth: AuthState;
  cart: CartState;
  wishlist: WishlistState;
  address: AddressState;
};

export function createStore(preloadedState?: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      address: addressReducer,
    },
    preloadedState,
  });
  return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>();
