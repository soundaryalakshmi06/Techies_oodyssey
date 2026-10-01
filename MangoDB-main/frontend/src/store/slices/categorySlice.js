import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, createCategory, updateCategory } from '../../api/endpoints';
import { addToast } from './toastSlice';

export const fetchCategoriesThunk = createAsyncThunk(
    'categories/fetchAll',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const data = await getCategories();
            // Handle array vs wrapped object
            return Array.isArray(data) ? data : (data.categories || data.data || []);
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Categories Error', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const createCategoryThunk = createAsyncThunk(
    'categories/create',
    async (categoryData, { dispatch, rejectWithValue }) => {
        try {
            const data = await createCategory(categoryData);
            dispatch(addToast({ type: 'success', title: 'Category Created', message: 'Category added successfully.' }));
            dispatch(fetchCategoriesThunk());
            return data;
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Create Category Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const updateCategoryThunk = createAsyncThunk(
    'categories/update',
    async ({ id, data }, { dispatch, rejectWithValue }) => {
        try {
            const updated = await updateCategory(id, data);
            dispatch(addToast({ type: 'success', title: 'Category Updated', message: 'Category updated successfully.' }));
            dispatch(fetchCategoriesThunk());
            return updated;
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Update Category Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;
