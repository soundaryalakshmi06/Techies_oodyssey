import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAdminSummary,
    getAdminProviders,
    updateProviderVerification,
    getAdminUsers,
    getCategories,
    createCategory,
} from '../../api/endpoints';
import { addToast } from './toastSlice';

// ── Stats (aliased from summary) ─────────────────────────────────────────────
export const fetchAdminStatsThunk = createAsyncThunk(
    'admin/fetchStats',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const data = await getAdminSummary();
            return data.summary || data.data || data;
        } catch (error) {
            // Backend may not be running; safe silent fail – pages render mock data
            return rejectWithValue(error.message);
        }
    }
);

// Alias for backward compat
export const fetchAdminSummaryThunk = fetchAdminStatsThunk;

// ── Pending verifications (providers with Pending status) ────────────────────
export const fetchPendingVerificationsThunk = createAsyncThunk(
    'admin/fetchPendingVerifications',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const data = await getAdminProviders({ verificationStatus: 'Pending' });
            return Array.isArray(data) ? data : (data.providers || data.data || []);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ── Update verification status ───────────────────────────────────────────────
export const updateVerificationStatusThunk = createAsyncThunk(
    'admin/updateVerificationStatus',
    async ({ providerId, status, reason }, { dispatch, rejectWithValue }) => {
        try {
            const data = await updateProviderVerification(providerId, { status, reason });
            return { id: providerId, status, data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Alias for backward compat
export const updateVerificationThunk = updateVerificationStatusThunk;

// ── All admin providers ──────────────────────────────────────────────────────
export const fetchAdminProvidersThunk = createAsyncThunk(
    'admin/fetchProviders',
    async (params = {}, { rejectWithValue }) => {
        try {
            const data = await getAdminProviders(params);
            return Array.isArray(data) ? data : (data.providers || data.data || []);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ── All users ────────────────────────────────────────────────────────────────
export const fetchAdminUsersThunk = createAsyncThunk(
    'admin/fetchUsers',
    async (params = {}, { rejectWithValue }) => {
        try {
            const data = await getAdminUsers(params);
            return Array.isArray(data) ? data : (data.users || data.data || []);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ── Categories ───────────────────────────────────────────────────────────────
export const fetchAdminCategoriesThunk = createAsyncThunk(
    'admin/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getCategories();
            return Array.isArray(data) ? data : (data.categories || data.data || []);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createAdminCategoryThunk = createAsyncThunk(
    'admin/createCategory',
    async (categoryData, { dispatch, rejectWithValue }) => {
        try {
            const data = await createCategory(categoryData);
            dispatch(fetchAdminCategoriesThunk());
            return data.category || data.data || data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ── Slice ────────────────────────────────────────────────────────────────────
const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        stats: null,
        summary: null,
        providers: [],
        pendingProviders: [],
        users: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Stats
            .addCase(fetchAdminStatsThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdminStatsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
                state.summary = action.payload;
            })
            .addCase(fetchAdminStatsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Pending verifications
            .addCase(fetchPendingVerificationsThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchPendingVerificationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingProviders = action.payload;
            })
            .addCase(fetchPendingVerificationsThunk.rejected, (state) => { state.loading = false; })

            // Update verification
            .addCase(updateVerificationStatusThunk.fulfilled, (state, action) => {
                state.pendingProviders = state.pendingProviders.filter(
                    (p) => p._id !== action.payload.id
                );
            })

            // All providers
            .addCase(fetchAdminProvidersThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminProvidersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.providers = action.payload;
            })
            .addCase(fetchAdminProvidersThunk.rejected, (state) => { state.loading = false; })

            // Users
            .addCase(fetchAdminUsersThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAdminUsersThunk.rejected, (state) => { state.loading = false; })

            // Categories
            .addCase(fetchAdminCategoriesThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminCategoriesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAdminCategoriesThunk.rejected, (state) => { state.loading = false; })

            .addCase(createAdminCategoryThunk.fulfilled, (state, action) => {
                if (action.payload) state.categories.push(action.payload);
            });
    },
});

export default adminSlice.reducer;
