import { Product } from "@/features/products/types/products.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistResponse } from "../types/wishlist.types";

export interface WishlistState {
    count?: number;
    data: string[] | Product[];
    isLoading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    count: 0,
    data: [],
    isLoading: false,
    error: null,
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlistInfo(state, action: PayloadAction<WishlistResponse>) {
           state.count = action.payload.count;
           state.data = action.payload.data;
        },
        removeProduct(state, action: PayloadAction<{productId: string}>) {            
           const productId = action.payload.productId;
           const products : Product[] = state.data as Product[];
           const removedProduct = products.find((product:Product) => product.id === productId);
           if(removedProduct){
            state.data = products.filter((product:Product) => product.id !== productId) as string[] | Product[];
            state.count = state.data.length;
           }
        },
    },
});

export const { setWishlistInfo, removeProduct } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;