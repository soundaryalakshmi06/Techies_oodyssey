/**
 * Format Indian Rupee Currency
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format Distance from meters or km
 */
export const formatDistance = (meters, km) => {
    if (km !== undefined && km !== null) {
        return `${Number(km).toFixed(1)} km away`;
    }
    if (meters !== undefined && meters !== null) {
        if (meters >= 1000) {
            return `${(meters / 1000).toFixed(1)} km away`;
        }
        return `${Math.round(meters)} m away`;
    }
    return null;
};

/**
 * Format Date String
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Format Time String
 */
export const formatTime = (timeString) => {
    if (!timeString) return '';
    const d = new Date(timeString);
    if (!isNaN(d.getTime())) {
        return d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    return timeString;
};

/**
 * Truncate Text
 */
export const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '…';
};
