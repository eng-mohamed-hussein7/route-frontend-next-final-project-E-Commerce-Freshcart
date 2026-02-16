import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, AddressResponse } from "../types/address.types";

export interface AddressState {
    results: number;
    data: Address[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    results: 0,
    data: [],
    isLoading: false,
    error: null,
}

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress(state, action: PayloadAction<AddressResponse>) {
           state.results = action.payload.results;
           state.data = action.payload.data;
        },
        removeAddress(state, action: PayloadAction<{addressId: string}>) {            
           const addressId = action.payload.addressId;
           const removedAddress = state.data.find((item) => item._id === addressId);
           if(removedAddress){
            state.data = state.data.filter((item) => item._id !== addressId);
            state.results = state.data.length;
           }
        },
        updateAddress(state, action: PayloadAction<Address>) {
            const addressId = action.payload._id;
            const address = action.payload;
            const updatedAddress = state.data.find((item) => item._id === addressId);
            if(updatedAddress){
                updatedAddress.name = address.name;
                updatedAddress.phone = address.phone;
                updatedAddress.city = address.city;
                updatedAddress.details = address.details;
            }
        },
    },
});

export const { addAddress, removeAddress, updateAddress } = addressSlice.actions;
export const addressReducer = addressSlice.reducer;