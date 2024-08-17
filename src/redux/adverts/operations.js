import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import toast from 'react-hot-toast';
import { selectFilters } from '../filters/selectors';
import { loadFromLocalStorage } from '../../utils/localStorage';

axios.defaults.baseURL = 'https://66bcfd1e24da2de7ff6c70f4.mockapi.io';

export const fetchAdverts = createAsyncThunk(
    'adverts/fetchAll',
    async ({ page = 1, limit = 4 }, thunkAPI) => {
        const state = thunkAPI.getState();
        const filters = selectFilters(state);
        let query = `page=${page}&limit=${limit}&`;

        Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (value !== null && value !== "" && key !== 'AC') {
                query += `${key}=${value}&`;
            }
        });

        try {
            const response = await axios.get(`/adverts?${query}`);
            console.log('API response data:', response.data);
            return response.data;
        } catch (e) {
            console.error('Error fetching adverts:', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchAdvertById = createAsyncThunk(
    'adverts/fetchById',
    async (advertId, thunkAPI) => {
        try {
            const response = await axios.get(`/adverts/${advertId}`);
            console.log('API response data:', response.data);
            return response.data;
        } catch (e) {
            console.error('Error fetching advert by ID:', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchSavedAdverts = createAsyncThunk(
    "adverts/fetchSavedAdverts",
    async (_, thunkAPI) => {
        const savedIds = loadFromLocalStorage('savedAdverts');
        
        try {
            const responses = await Promise.all(savedIds.map(id => axios.get(`/adverts/${id}`)));
            return responses.map(response => response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
