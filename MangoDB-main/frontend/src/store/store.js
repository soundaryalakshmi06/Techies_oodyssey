import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toastReducer from './slices/toastSlice';
import categoryReducer from './slices/categorySlice';
import providerReducer from './slices/providerSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        categories: categoryReducer,
        providers: providerReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
