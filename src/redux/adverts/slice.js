import { createSlice } from "@reduxjs/toolkit";
import { fetchAdverts, fetchAdvertById, fetchSavedAdverts } from "./operations";
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "../../utils/localStorage";

const advertsSlice = createSlice({
    name: "adverts",
    initialState: {
        allAdverts: [],
        savedAdverts: [],
        singleAdvert: null,
        isLoading: false,
        error: null,
        page: 1,
        totalPages: 4
    },
    reducers: {
        addAdvertToSaved: (state, action) => {
            const advertId = action.payload;
            let savedIds = loadFromLocalStorage('savedAdverts');
            if (!savedIds.includes(advertId)) {
                savedIds.push(advertId);
                saveToLocalStorage('savedAdverts', savedIds);
                const advert = state.allAdverts.find(ad => ad._id === advertId);
                if (advert) {
                    state.savedAdverts.push(advert);
                }
            }
        },
        removeAdvertFromSaved: (state, action) => {
            const advertId = action.payload;
            let savedIds = loadFromLocalStorage('savedAdverts');
            savedIds = savedIds.filter(id => id !== advertId);
            removeFromLocalStorage('savedAdverts', savedIds);
            state.savedAdverts = state.savedAdverts.filter(advert => advert._id !== advertId);
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdverts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAdverts.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.page === 1) {
                    state.allAdverts = action.payload;
                } else {
                    state.allAdverts = [...state.allAdverts, ...action.payload];
                }
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

export const { addAdvertToSaved, removeAdvertFromSaved, setPage } = advertsSlice.actions;
export const advertsReducer = advertsSlice.reducer;