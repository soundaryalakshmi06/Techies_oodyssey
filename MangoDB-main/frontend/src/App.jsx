import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import ProviderLayout from './layouts/ProviderLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProviderRegister from './pages/auth/ProviderRegister';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Services from './pages/customer/Services';
import Providers from './pages/customer/Providers';
import ProviderDetail from './pages/customer/ProviderDetail';
import RequestWizard from './pages/customer/RequestWizard';
import Matches from './pages/customer/Matches';
import Quotes from './pages/customer/Quotes';
import Bookings from './pages/customer/Bookings';
import BookingDetail from './pages/customer/BookingDetail';
import Tracking from './pages/customer/Tracking';
import Emergency from './pages/customer/Emergency';
import EmergencyDetail from './pages/customer/EmergencyDetail';
import History from './pages/customer/History';
import InvoiceDetail from './pages/customer/InvoiceDetail';
import Reviews from './pages/customer/Reviews';
import SavedProviders from './pages/customer/SavedProviders';
import Notifications from './pages/customer/Notifications';
import Profile from './pages/customer/Profile';
import Settings from './pages/customer/Settings';

// Provider Pages
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProviderRequests from './pages/provider/ProviderRequests';
import ProviderRequestDetail from './pages/provider/ProviderRequestDetail';
import QuoteForm from './pages/provider/QuoteForm';
import ProviderEmergency from './pages/provider/ProviderEmergency';
import ProviderBookings from './pages/provider/ProviderBookings';
import ProviderBookingDetail from './pages/provider/ProviderBookingDetail';
import ProviderServices from './pages/provider/ProviderServices';
import ProviderAvailability from './pages/provider/ProviderAvailability';
import ProviderEarnings from './pages/provider/ProviderEarnings';
import ProviderReviews from './pages/provider/ProviderReviews';
import ProviderVerification from './pages/provider/ProviderVerification';
import ProviderNotifications from './pages/provider/ProviderNotifications';
import ProviderProfile from './pages/provider/ProviderProfile';
import ProviderSettings from './pages/provider/ProviderSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVerifications from './pages/admin/AdminVerifications';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Common
import { NotFound } from './pages/common/NotFound';

// Toast
import ToastContainer from './components/common/Toast';

// ─── Read session from localStorage (token + user are stored separately) ─────
const getSession = () => {
    const token = localStorage.getItem('vt_token');
    const raw = localStorage.getItem('vt_user');
    if (!token || !raw) return null;
    try {
        const user = JSON.parse(raw);
        return user ? { token, user } : null;
    } catch {
        return null;
    }
};

const portalFor = (role) => {
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'provider') return '/provider/dashboard';
    return '/customer/dashboard';
};

// ─── Protected Route: must be logged in (and have the right role) ─────────────
const ProtectedRoute = ({ allowedRoles }) => {
    const session = getSession();
    if (!session) return <Navigate to="/login" replace />;

    const { role } = session.user;
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to={portalFor(role)} replace />;
    }
    return <Outlet />;
};

// ─── Public-only Route: login/register pages, hidden once logged in ──────────
const PublicOnlyRoute = () => {
    const session = getSession();
    if (session) return <Navigate to={portalFor(session.user.role)} replace />;
    return <Outlet />;
};

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    {/* ── Entry: Login is the first page ────────────── */}
                    <Route element={<PublicOnlyRoute />}>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/register/provider" element={<ProviderRegister />} />
                        <Route path="/provider/register" element={<ProviderRegister />} />
                    </Route>

                    {/* Old landing page, kept at /home for demos */}
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/portal" element={<Navigate to="/" replace />} />

                    {/* ── Customer routes ───────────────────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                        <Route element={<CustomerLayout />}>
                            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                            <Route path="/customer/services" element={<Services />} />
                            <Route path="/customer/providers" element={<Providers />} />
                            <Route path="/customer/providers/:id" element={<ProviderDetail />} />
                            <Route path="/customer/request/new" element={<RequestWizard />} />
                            <Route path="/customer/matches" element={<Matches />} />
                            <Route path="/customer/quotes" element={<Quotes />} />
                            <Route path="/customer/bookings" element={<Bookings />} />
                            <Route path="/customer/bookings/:id" element={<BookingDetail />} />
                            <Route path="/customer/tracking/:id" element={<Tracking />} />
                            <Route path="/customer/emergency" element={<Emergency />} />
                            <Route path="/customer/emergency/:id" element={<EmergencyDetail />} />
                            <Route path="/customer/history" element={<History />} />
                            <Route path="/customer/invoices/:id" element={<InvoiceDetail />} />
                            <Route path="/customer/reviews" element={<Reviews />} />
                            <Route path="/customer/saved" element={<SavedProviders />} />
                            <Route path="/customer/notifications" element={<Notifications />} />
                            <Route path="/customer/profile" element={<Profile />} />
                            <Route path="/customer/settings" element={<Settings />} />
                            <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />
                        </Route>
                    </Route>

                    {/* ── Provider routes ───────────────────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={['provider']} />}>
                        <Route element={<ProviderLayout />}>
                            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                            <Route path="/provider/requests" element={<ProviderRequests />} />
                            <Route path="/provider/requests/:id" element={<ProviderRequestDetail />} />
                            <Route path="/provider/requests/:id/quote" element={<QuoteForm />} />
                            <Route path="/provider/emergency" element={<ProviderEmergency />} />
                            <Route path="/provider/bookings" element={<ProviderBookings />} />
                            <Route path="/provider/bookings/:id" element={<ProviderBookingDetail />} />
                            <Route path="/provider/services" element={<ProviderServices />} />
                            <Route path="/provider/availability" element={<ProviderAvailability />} />
                            <Route path="/provider/earnings" element={<ProviderEarnings />} />
                            <Route path="/provider/reviews" element={<ProviderReviews />} />
                            <Route path="/provider/verification" element={<ProviderVerification />} />
                            <Route path="/provider/notifications" element={<ProviderNotifications />} />
                            <Route path="/provider/profile" element={<ProviderProfile />} />
                            <Route path="/provider/settings" element={<ProviderSettings />} />
                            <Route path="/provider" element={<Navigate to="/provider/dashboard" replace />} />
                        </Route>
                    </Route>

                    {/* ── Admin routes ──────────────────────────────── */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/verifications" element={<AdminVerifications />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/categories" element={<AdminCategories />} />
                            <Route path="/admin/analytics" element={<AdminAnalytics />} />
                            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                        </Route>
                    </Route>

                    {/* ── 404 ──────────────────────────────────────── */}
                    <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Global Toast Notification System */}
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    );
}