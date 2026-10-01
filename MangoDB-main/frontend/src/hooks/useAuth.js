import { useSelector, useDispatch } from 'react-redux';
import { loginThunk, registerThunk, logout, clearAuthError } from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, role, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const handleLogin = (credentials) => dispatch(loginThunk(credentials));
    const handleRegister = (userData) => dispatch(registerThunk(userData));
    const handleLogout = () => dispatch(logout());
    const handleClearError = () => dispatch(clearAuthError());

    // Expose thunk action matchers so pages can do login.fulfilled.match(result)
    handleLogin.fulfilled = loginThunk.fulfilled;
    handleLogin.rejected = loginThunk.rejected;
    handleRegister.fulfilled = registerThunk.fulfilled;
    handleRegister.rejected = registerThunk.rejected;

    return {
        user,
        token,
        role,
        isAuthenticated,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        clearError: handleClearError,
        isCustomer: role === 'customer',
        isProvider: role === 'provider',
        isAdmin: role === 'admin',
    };
};

export default useAuth;