import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
    },
    reducers: {
        addToast: (state, action) => {
            const id = Date.now() + Math.random().toString();
            state.toasts.push({
                id,
                type: action.payload.type || 'info', // 'success' | 'error' | 'warning' | 'info'
                title: action.payload.title || '',
                message: action.payload.message || '',
                duration: action.payload.duration || 4000,
            });
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;
export const showToast = addToast;   // alias, use your actual action name
export default toastSlice.reducer;
