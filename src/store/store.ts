import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./slices/cartCounterSlice";

// Store'un tipi
export const store = configureStore({
    reducer: {
        cartCounter: cartCounterReducer,
    },
});

// RootState ve AppDispatch tiplerini türet
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
