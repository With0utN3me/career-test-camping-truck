import { configureStore } from '@reduxjs/toolkit';
import { advertsReducer } from './adverts/slice';
import { filtersReducer } from './filters/slice';

export const store = configureStore({
    reducer: {
        adverts: advertsReducer,
        filters: filtersReducer,
    },
});

export default store;