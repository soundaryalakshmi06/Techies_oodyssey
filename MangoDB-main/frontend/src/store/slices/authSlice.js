import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/endpoints';
import { addToast } from './toastSlice';

// Safely parse initial user from localStorage
const getStoredUser = () => {
    try {
        const raw = localStorage.getItem('vt_user');
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
};

const initialToken = localStorage.getItem('vt_token') || null;
const initialUser = getStoredUser();

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const data = await loginUser(credentials);
            // Data expected to have { token, user } or similar confirmed response
            const token = data.token || data.accessToken;
            const user = data.user || data.data?.user || data;

            if (token) {
                localStorage.setItem('vt_token', token);
            }
            if (user) {
                localStorage.setItem('vt_user', JSON.stringify(user));
            }

            dispatch(addToast({ type: 'success', title: 'Welcome Back!', message: `Logged in as ${user?.name || user?.email}` }));
            return { token, user };
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Login Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            const data = await registerUser(userData);
            const token = data.token || data.accessToken;
            const user = data.user || data.data?.user || data;

            if (token) {
                localStorage.setItem('vt_token', token);
            }
            if (user) {
                localStorage.setItem('vt_user', JSON.stringify(user));
            }

            dispatch(addToast({
                type: 'success',
                title: 'Registration Successful',
                message: user?.role === 'provider' ? 'Registration submitted for verification.' : 'Welcome to VinaiThunai!'
            }));
            return { token, user };
        } catch (error) {
            dispatch(addToast({ type: 'error', title: 'Registration Failed', message: error.message }));
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken,
        user: initialUser,
        role: initialUser?.role || null,
        isAuthenticated: !!initialToken,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('vt_token');
            localStorage.removeItem('vt_user');
            state.token = null;
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        updateUserProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('vt_user', JSON.stringify(state.user));
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.role = action.payload.user?.role || 'customer';
                state.isAuthenticated = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token || state.token;
                state.user = action.payload.user || state.user;
                state.role = action.payload.user?.role || state.role;
                state.isAuthenticated = !!(action.payload.token || state.token);
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthError, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
