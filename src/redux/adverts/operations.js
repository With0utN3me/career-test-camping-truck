import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectFilters } from '../filters/selectors';
import { loadFromLocalStorage } from '../../utils/localStorage';

axios.defaults.baseURL = 'https://66bcfd1e24da2de7ff6c70f4.mockapi.io';

const buildQuery = (filters) => {
    let query = '';

    if (filters.location) query += `&location=${filters.location}`;
    if (filters.form) query += `&form=${filters.form}`;
    if (filters.transmission) query += `&transmission=${filters.transmission}`;

    Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (value === 1) {
            query += `&${key}`;
        }
    });

    return query;
};

export const fetchAdverts = createAsyncThunk(
    'adverts/fetchAll',
    async ({ page = 1, limit = 13 }, thunkAPI) => {
        const state = thunkAPI.getState();
        const filters = selectFilters(state);
        const query = buildQuery(filters);
        
        try {
            const response = await axios.get(`/adverts?page=${page}&limit=${limit}${query}`);
            const allAdverts = response.data;

            const nextPageQuery = buildQuery(filters);
            const nextPageResponse = await axios.get(`/adverts?page=${page + 1}&limit=${limit}${nextPageQuery}`);
            const hasMore = nextPageResponse.data.length > 0;

            return { allAdverts, hasMore };
        } catch (e) {
            console.error('Error fetching adverts:', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const fetchSavedAdverts = createAsyncThunk(
    'adverts/fetchSavedAdverts',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const filters = selectFilters(state);
        const query = buildQuery(filters);

        try {
            const savedIds = loadFromLocalStorage('savedAdverts');

            if (!savedIds || savedIds.length === 0) {
                return []; 
            }

            // Запити до серверу для кожного збереженого оголошення
            const responses = await Promise.all(savedIds.map(id =>
                axios.get(`/adverts?_id=${id}${query}`).catch(err => {
                    // Відловлюємо помилки окремо для кожного запиту
                    console.error(`Error fetching advert with id ${id}:`, err.message);
                    return { data: [] }; // Повертаємо порожній масив у випадку помилки
                })
            ));

            // Обробка результатів запитів
            const adverts = responses.flatMap(response => response.data);
            return adverts;
        } catch (error) {
            console.error('Error fetching saved adverts:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchAdvertById = createAsyncThunk(
    'adverts/fetchById',
    async (advertId, thunkAPI) => {
        try {
            const response = await axios.get(`/adverts?_id=${advertId}`);
            return response.data.length > 0 ? response.data[0] : null;
            
        } catch (e) {
            console.error('Error fetching advert by ID:', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


