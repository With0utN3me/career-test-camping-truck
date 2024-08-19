import { createSlice } from "@reduxjs/toolkit";
import { fetchAdverts, fetchAdvertById, fetchSavedAdverts } from "./operations";

const advertsSlice = createSlice({
    name: "adverts",
    initialState: {
        allAdverts: [],
        savedAdverts: [],
        singleAdvert: null,
        isLoading: false,
        error: null,
        page: 1,
        hasMore: true,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSingleAdvert: (state, action) => {
            state.singleAdvert = action.payload;
        },
        setAllAdverts: (state, action) => {
            state.allAdverts = action.payload;
        },
        setSavedAdverts: (state, action) => {
            state.savedAdverts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdverts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdverts.fulfilled, (state, action) => {
                const { allAdverts, hasMore } = action.payload;
                if (state.page === 1) {
                    state.allAdverts = allAdverts;
                } else {
                    state.allAdverts = [...state.allAdverts, ...allAdverts];
                }
                state.hasMore = hasMore;
                state.isLoading = false;
            })
            .addCase(fetchAdverts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            

            .addCase(fetchAdvertById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdvertById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleAdvert = action.payload;
            })
            .addCase(fetchAdvertById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            .addCase(fetchSavedAdverts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSavedAdverts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.savedAdverts = action.payload;
            })
            .addCase(fetchSavedAdverts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setPage, setSingleAdvert, setAllAdverts, setSavedAdverts } = advertsSlice.actions;
export const advertsReducer = advertsSlice.reducer;