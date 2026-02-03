import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "@/features/auth/store/auth.slice";

export type PreloadedState = {
    auth: AuthState;
}

export function createStore(preloadedState?: PreloadedState){
    const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});
return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>
