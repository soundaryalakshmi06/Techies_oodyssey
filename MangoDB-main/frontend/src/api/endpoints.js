import api from './axios';

/**
 * Custom error class for PENDING BACKEND endpoints.
 * UI components capture this error to render accessible "Not connected yet" / Error states
 * without resorting to fake success or static hardcoded data.
 */
export class EndpointNotConnectedError extends Error {
    constructor(endpointName, details = 'This feature is pending backend implementation.') {
        super(`[PENDING BACKEND] ${endpointName}: ${details}`);
        this.name = 'EndpointNotConnectedError';
        this.endpointName = endpointName;
        this.isPendingBackend = true;
    }
}

// ============================================================================
// CONFIRMED BACKEND ENDPOINTS
// ============================================================================

/**
 * POST /api/auth/register
 */
export const registerUser = async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
};

/**
 * POST /api/auth/login
 */
export const loginUser = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
};

/**
 * GET /api/categories
 */
export const getCategories = async () => {
    const response = await api.get('/api/categories');
    return response.data;
};

/**
 * POST /api/categories
 */
export const createCategory = async (categoryData) => {
    const response = await api.post('/api/categories', categoryData);
    return response.data;
};

/**
 * PATCH /api/categories/:id
 */
export const updateCategory = async (id, categoryData) => {
    const response = await api.patch(`/api/categories/${id}`, categoryData);
    return response.data;
};

/**
 * GET /api/providers
 * Query params supported: category, service, language, available, minRating, maxPrice, city, search, sort
 * sort ∈ rating | priceLow | priceHigh | experience
 */
export const getProviders = async (params = {}) => {
    const response = await api.get('/api/providers', { params });
    return response.data;
};

/**
 * GET /api/providers/nearby
 * Query params: longitude, latitude, maxDistance, category, service, language
 */
export const getNearbyProviders = async (params = {}) => {
    const response = await api.get('/api/providers/nearby', { params });
    return response.data;
};

/**
 * GET /api/providers/:id
 */
export const getProviderById = async (id) => {
    const response = await api.get(`/api/providers/${id}`);
    return response.data;
};

/**
 * PATCH /api/providers/:id/availability
 * Body: { available: boolean }
 */
export const updateProviderAvailability = async (id, available) => {
    const response = await api.patch(`/api/providers/${id}/availability`, { available });
    return response.data;
};

/**
 * PATCH /api/providers/:id/location
 * Body: { longitude: number, latitude: number }
 */
export const updateProviderLocation = async (id, { longitude, latitude }) => {
    const response = await api.patch(`/api/providers/${id}/location`, { longitude, latitude });
    return response.data;
};

/**
 * GET /api/admin/summary
 */
export const getAdminSummary = async () => {
    const response = await api.get('/api/admin/summary');
    return response.data;
};

/**
 * GET /api/admin/providers
 */
export const getAdminProviders = async (params = {}) => {
    const response = await api.get('/api/admin/providers', { params });
    return response.data;
};

/**
 * PATCH /api/admin/providers/:id/verification
 * Body: { status: 'Approved' | 'Rejected' | 'Pending', reason?: string }
 */
export const updateProviderVerification = async (id, payload) => {
    const response = await api.patch(`/api/admin/providers/${id}/verification`, payload);
    return response.data;
};

/**
 * GET /api/admin/users
 * Query params: role (customer | provider | admin), search
 */
export const getAdminUsers = async (params = {}) => {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
};

/**
 * PATCH /api/admin/users/:id/active
 * Body: { isActive: boolean }
 */
export const setUserActive = async (id, isActive) => {
    const response = await api.patch(`/api/admin/users/${id}/active`, { isActive });
    return response.data;
};

// ============================================================================
// PENDING BACKEND ENDPOINTS (Isolated API Stubs)
// ============================================================================

// PENDING BACKEND: Auth Forgot Password
export const forgotPassword = async (email) => {
    throw new EndpointNotConnectedError('POST /api/auth/forgot-password', 'Password reset flow is pending backend implementation.');
};

// PENDING BACKEND: Customer Service Requests
export const createServiceRequest = async (requestData) => {
    throw new EndpointNotConnectedError('POST /api/requests', 'Service request creation is pending backend connection.');
};

export const getServiceRequest = async (id) => {
    throw new EndpointNotConnectedError(`GET /api/requests/${id}`, 'Service request detail is pending backend connection.');
};

export const getCustomerRequests = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/requests/customer', 'Customer requests listing is pending backend connection.');
};

export const cancelServiceRequest = async (id) => {
    throw new EndpointNotConnectedError(`DELETE /api/requests/${id}`, 'Cancelling service request is pending backend connection.');
};

// PENDING BACKEND: Emergency Requests
export const createEmergencyRequest = async (emergencyData) => {
    throw new EndpointNotConnectedError('POST /api/emergency/requests', 'Emergency request creation is pending backend connection.');
};

export const getNearbyEmergencyProviders = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/emergency/nearby', 'Nearby emergency providers search is pending backend connection.');
};

export const acceptEmergencyRequest = async (id) => {
    throw new EndpointNotConnectedError(`POST /api/emergency/requests/${id}/accept`, 'Accepting emergency request is pending backend connection.');
};

// PENDING BACKEND: Provider Assessment & Quotes
export const createQuote = async (requestId, quoteData) => {
    throw new EndpointNotConnectedError(`POST /api/requests/${requestId}/quotes`, 'Provider quote submission is pending backend connection.');
};

export const getQuote = async (id) => {
    throw new EndpointNotConnectedError(`GET /api/quotes/${id}`, 'Quote details retrieval is pending backend connection.');
};

export const approveQuote = async (id) => {
    throw new EndpointNotConnectedError(`POST /api/quotes/${id}/approve`, 'Approving quote is pending backend connection.');
};

export const rejectQuote = async (id, reason) => {
    throw new EndpointNotConnectedError(`POST /api/quotes/${id}/reject`, 'Rejecting quote is pending backend connection.');
};

// PENDING BACKEND: Bookings & Tracking
export const createBooking = async (bookingData) => {
    throw new EndpointNotConnectedError('POST /api/bookings', 'Booking creation is pending backend connection.');
};

export const getBookings = async (role = 'customer', params = {}) => {
    throw new EndpointNotConnectedError(`GET /api/bookings?role=${role}`, 'Bookings list is pending backend connection.');
};

export const getBookingDetails = async (id) => {
    throw new EndpointNotConnectedError(`GET /api/bookings/${id}`, 'Booking detail is pending backend connection.');
};

export const updateBookingStatus = async (id, status, extraData = {}) => {
    throw new EndpointNotConnectedError(`PATCH /api/bookings/${id}/status`, 'Updating booking status is pending backend connection.');
};

export const getTrackingData = async (bookingId) => {
    throw new EndpointNotConnectedError(`GET /api/bookings/${bookingId}/tracking`, 'Real-time tracking is pending backend connection.');
};

// PENDING BACKEND: Additional Work & Evidence
export const requestAdditionalWork = async (bookingId, payload) => {
    throw new EndpointNotConnectedError(`POST /api/bookings/${bookingId}/additional-work`, 'Additional work request is pending backend connection.');
};

export const respondAdditionalWork = async (bookingId, workId, approved) => {
    throw new EndpointNotConnectedError(`POST /api/bookings/${bookingId}/additional-work/${workId}/respond`, 'Responding to additional work is pending backend connection.');
};

export const uploadServiceEvidence = async (bookingId, evidenceData) => {
    throw new EndpointNotConnectedError(`POST /api/bookings/${bookingId}/evidence`, 'Uploading service evidence is pending backend connection.');
};

// PENDING BACKEND: Invoices & History
export const getInvoice = async (bookingId) => {
    throw new EndpointNotConnectedError(`GET /api/invoices/${bookingId}`, 'Invoice retrieval is pending backend connection.');
};

export const getServiceHistory = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/customer/history', 'Service history is pending backend connection.');
};

// PENDING BACKEND: Reviews
export const createReview = async (reviewData) => {
    throw new EndpointNotConnectedError('POST /api/reviews', 'Review submission is pending backend connection.');
};

export const getReviews = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/reviews', 'Reviews retrieval is pending backend connection.');
};

// PENDING BACKEND: Saved Providers
export const saveProvider = async (providerId) => {
    throw new EndpointNotConnectedError(`POST /api/saved-providers/${providerId}`, 'Saving provider is pending backend connection.');
};

export const removeSavedProvider = async (providerId) => {
    throw new EndpointNotConnectedError(`DELETE /api/saved-providers/${providerId}`, 'Removing saved provider is pending backend connection.');
};

export const getSavedProviders = async () => {
    throw new EndpointNotConnectedError('GET /api/saved-providers', 'Saved providers retrieval is pending backend connection.');
};

// PENDING BACKEND: Notifications
export const getNotifications = async () => {
    throw new EndpointNotConnectedError('GET /api/notifications', 'Notifications retrieval is pending backend connection.');
};

export const markNotificationRead = async (id) => {
    throw new EndpointNotConnectedError(`PATCH /api/notifications/${id}/read`, 'Marking notification read is pending backend connection.');
};

// PENDING BACKEND: Provider Earnings & Services Management
export const getProviderEarnings = async () => {
    throw new EndpointNotConnectedError('GET /api/provider/earnings', 'Provider earnings retrieval is pending backend connection.');
};

export const updateProviderServices = async (providerId, services) => {
    throw new EndpointNotConnectedError(`PATCH /api/providers/${providerId}/services`, 'Updating provider services is pending backend connection.');
};

// PENDING BACKEND: Media Upload Stub
export const uploadMedia = async (file) => {
    throw new EndpointNotConnectedError('POST /api/media/upload', 'Media upload to backend/Cloudinary is pending backend connection.');
};

// PENDING BACKEND: Admin Extra Endpoints
export const getAdminBookings = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/admin/bookings', 'Admin bookings list is pending backend connection.');
};

export const getAdminReviews = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/admin/reviews', 'Admin reviews list is pending backend connection.');
};

export const getAdminActivity = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/admin/activity', 'Admin activity log is pending backend connection.');
};

export const getAdminAnalytics = async (params = {}) => {
    throw new EndpointNotConnectedError('GET /api/admin/analytics', 'Admin analytics is pending backend connection.');
};

// CONFIRMED BACKEND: User profile update (PATCH /api/auth/profile)
export const updateProfile = async (profileData) => {
    const response = await api.patch('/api/auth/profile', profileData);
    return response.data;
};

// PENDING BACKEND: Create customer service request (alias for RequestWizard)
export const createCustomerRequest = async (requestData) => {
    throw new EndpointNotConnectedError('POST /api/requests', 'Customer service request creation is pending backend connection.');
};