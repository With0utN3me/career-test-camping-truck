import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "",
    form: "",
    transmission: "",
    kitchen: null,
    TV: null,
    shower: null,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState, 
    reducers: {
        setFilter(state, action) {
            state[action.payload.filterName] = action.payload.value;
        },
        resetFilters(state) {
            Object.keys(state).forEach(key => state[key] = initialState[key]);
        }
    }
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
