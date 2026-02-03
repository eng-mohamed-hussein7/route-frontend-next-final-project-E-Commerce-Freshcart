import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id?: string;
  name: string;
  email?: string;
  role: string;
};

export type AuthState = {
  userInfo: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  userInfo: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthInfo } = authSlice.actions;
