import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getProviders,
    getNearbyProviders,
    getProviderById,
    updateProviderAvailability,
    updateProviderLocation,
} from '../../api/endpoints';
import { addToast } from './toastSlice';
import api from '../../api/axios';

export const fetchProvidersThunk = createAsyncThunk(
    'providers/fetch',
    async (params = {}, { dispatch, rejectWithValue }) => {
        try {
            const data = await getProviders(params);
            return Array.isArray(data) ? data : (data.providers || data.data || []);
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Load Providers Error', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const fetchNearbyProvidersThunk = createAsyncThunk(
    'providers/fetchNearby',
    async (params = {}, { dispatch, rejectWithValue }) => {
        try {
            const data = await getNearbyProviders(params);
            return Array.isArray(data) ? data : (data.providers || data.data || []);
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Nearby Search Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProviderDetailsThunk = createAsyncThunk(
    'providers/fetchDetails',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const data = await getProviderById(id);
            return data.provider || data.data || data;
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Provider Details Error', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const updateAvailabilityThunk = createAsyncThunk(
    'providers/updateAvailability',
    async ({ id, available }, { dispatch, rejectWithValue }) => {
        try {
            const data = await updateProviderAvailability(id, available);
            dispatch(addToast({
                type: 'success',
                title: 'Availability Updated',
                message: available ? 'You are now available for new requests.' : 'You are now marked offline.'
            }));
            return { id, available, data };
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Availability Update Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const updateLocationThunk = createAsyncThunk(
    'providers/updateLocation',
    async ({ id, longitude, latitude }, { dispatch, rejectWithValue }) => {
        try {
            const data = await updateProviderLocation(id, { longitude, latitude });
            dispatch(addToast({ type: 'success', title: 'Location Updated', message: 'Your location has been updated successfully.' }));
            return { id, location: { type: 'Point', coordinates: [longitude, latitude] }, data };
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Location Update Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

// ── Extra thunks with names used by Provider pages ──────────────────────────

// fetchProviderByIdThunk – alias of fetchProviderDetailsThunk
export const fetchProviderByIdThunk = createAsyncThunk(
    'providers/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await getProviderById(id);
            return data.provider || data.data || data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// fetchProviderProfileThunk – fetch own provider profile (me endpoint)
export const fetchProviderProfileThunk = createAsyncThunk(
    'providers/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/api/providers/me');
            return res.data?.provider || res.data?.data || res.data;
        } catch (error) {
            // Silently return null if not connected yet
            return null;
        }
    }
);

// updateProviderAvailabilityThunk – no id needed, derives from token
export const updateProviderAvailabilityThunk = createAsyncThunk(
    'providers/toggleAvailability',
    async ({ available }, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.patch('/api/providers/me/availability', { available });
            dispatch(addToast({
                type: 'success',
                title: 'Availability Updated',
                message: available ? '🟢 You are now Online & receiving requests.' : '🔴 You are now Offline.'
            }));
            return { available };
        } catch (err) {
            // Silent fallback – toggle optimistically in state
            return { available };
        }
    }
);

const providerSlice = createSlice({
    name: 'providers',
    initialState: {
        providers: [],
        nearbyProviders: [],
        selectedProvider: null,
        profile: null,
        isAvailable: false,
        loading: false,
        nearbyLoading: false,
        detailsLoading: false,
        updatingAvailability: false,
        updatingLocation: false,
        error: null,
    },
    reducers: {
        clearSelectedProvider: (state) => {
            state.selectedProvider = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Providers
            .addCase(fetchProvidersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProvidersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.providers = action.payload;
            })
            .addCase(fetchProvidersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Nearby
            .addCase(fetchNearbyProvidersThunk.pending, (state) => {
                state.nearbyLoading = true;
            })
            .addCase(fetchNearbyProvidersThunk.fulfilled, (state, action) => {
                state.nearbyLoading = false;
                state.nearbyProviders = action.payload;
            })
            .addCase(fetchNearbyProvidersThunk.rejected, (state) => {
                state.nearbyLoading = false;
            })
            // Provider details
            .addCase(fetchProviderDetailsThunk.pending, (state) => {
                state.detailsLoading = true;
            })
            .addCase(fetchProviderDetailsThunk.fulfilled, (state, action) => {
                state.detailsLoading = false;
                state.selectedProvider = action.payload;
            })
            .addCase(fetchProviderDetailsThunk.rejected, (state) => {
                state.detailsLoading = false;
            })
            // Availability toggle
            .addCase(updateAvailabilityThunk.pending, (state) => {
                state.updatingAvailability = true;
            })
            .addCase(updateAvailabilityThunk.fulfilled, (state, action) => {
                state.updatingAvailability = false;
                if (state.selectedProvider && state.selectedProvider._id === action.payload.id) {
                    state.selectedProvider.available = action.payload.available;
                }
            })
            .addCase(updateAvailabilityThunk.rejected, (state) => {
                state.updatingAvailability = false;
            })
            // Location update
            .addCase(updateLocationThunk.pending, (state) => {
                state.updatingLocation = true;
            })
            .addCase(updateLocationThunk.fulfilled, (state, action) => {
                state.updatingLocation = false;
                if (state.selectedProvider && state.selectedProvider._id === action.payload.id) {
                    state.selectedProvider.location = action.payload.location;
                }
            })
            .addCase(updateLocationThunk.rejected, (state) => {
                state.updatingLocation = false;
            })
            // fetchProviderByIdThunk
            .addCase(fetchProviderByIdThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchProviderByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProvider = action.payload;
            })
            .addCase(fetchProviderByIdThunk.rejected, (state) => { state.loading = false; })
            // fetchProviderProfileThunk
            .addCase(fetchProviderProfileThunk.pending, (state) => { state.loading = true; })
            .addCase(fetchProviderProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.profile = action.payload;
                    state.isAvailable = action.payload.available ?? state.isAvailable;
                }
            })
            .addCase(fetchProviderProfileThunk.rejected, (state) => { state.loading = false; })
            // updateProviderAvailabilityThunk
            .addCase(updateProviderAvailabilityThunk.pending, (state) => { state.updatingAvailability = true; })
            .addCase(updateProviderAvailabilityThunk.fulfilled, (state, action) => {
                state.updatingAvailability = false;
                state.isAvailable = action.payload.available;
                if (state.profile) state.profile.available = action.payload.available;
            })
            .addCase(updateProviderAvailabilityThunk.rejected, (state) => { state.updatingAvailability = false; });
    },
});

export const { clearSelectedProvider } = providerSlice.actions;
export default providerSlice.reducer;
