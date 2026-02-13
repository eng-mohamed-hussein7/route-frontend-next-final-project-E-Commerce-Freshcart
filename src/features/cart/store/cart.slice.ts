import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartResponse } from "../types/Cart.type";

export interface CartState {
    numOfCartItems: number;
    cartId: string | null;
    products: CartItem[];
    totalCartPrice: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: CartState = {
    numOfCartItems: 0,
    cartId: null,
    products: [],
    totalCartPrice: 0,
    isLoading: false,
    error: null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartInfo(state, action: PayloadAction<CartResponse>) {
           state.numOfCartItems = action.payload.numOfCartItems;
           state.cartId = action.payload.cartId;
           state.products = action.payload.data.products;
           state.totalCartPrice = action.payload.data.totalCartPrice;
        },
        removeProduct(state, action: PayloadAction<{productId: string}>) {            
           const productId = action.payload.productId;
           const removedProduct = state.products.find((item) => item.product._id === productId);
           if(removedProduct){
            state.products = state.products.filter((item) => item.product._id !== productId);
            state.numOfCartItems = state.products.length;
            state.totalCartPrice -= removedProduct.price * removedProduct.count;
           }
        },
    },
});

export const { setCartInfo, removeProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;