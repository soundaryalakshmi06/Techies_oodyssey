/**
 * Inline Form Validation Helper Functions
 */

export const validateEmail = (email) => {
    if (!email || !email.trim()) return 'Email is required.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email.trim())) return 'Please enter a valid email address.';
    return '';
};

export const validatePhone = (phone) => {
    if (!phone || !phone.trim()) return 'Phone number is required.';
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 13) {
        return 'Please enter a valid 10-digit phone number.';
    }
    return '';
};

export const validatePassword = (password) => {
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
};

export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} is required.`;
    }
    return '';
};

export const validateNumber = (value, fieldName = 'Value', { min, max } = {}) => {
  if (value === '' || value === null || value === undefined) {
    return `${fieldName} is required`;
  }
  const num = Number(value);
  if (Number.isNaN(num)) return `${fieldName} must be a number`;
  if (min !== undefined && num < min) return `${fieldName} must be at least ${min}`;
  if (max !== undefined && num > max) return `${fieldName} must be at most ${max}`;
  return '';
};