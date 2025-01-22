import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/categories";


interface CategoriesState {
    data: Category[],
    loading: boolean,
    error: string | null
}


const initialState: CategoriesState = {
    data: [],
    loading: false,
    error: null
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        getCategories: () => {

        }
    },
});

// Action'ları ve reducer'ı dışa aktar
export const { getCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
