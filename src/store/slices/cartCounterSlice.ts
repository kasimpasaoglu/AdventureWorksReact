import { createSlice } from "@reduxjs/toolkit";


interface CartCounterState {
    value: number;
}


const initialState: CartCounterState = {
    value: 0,
};

export const cartCounterSlice = createSlice({
    name: "cartCounter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

// Action'ları ve reducer'ı dışa aktar
export const { increment, decrement } = cartCounterSlice.actions;
export default cartCounterSlice.reducer;
