import Provider from '../models/Provider.js';

// The safe user object sent to the frontend after login/register
export const buildUserPayload = async (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        city: user.city,
    };

    if (user.role === 'provider') {
        const p = await Provider.findOne({ user: user._id }).select(
            'verificationStatus verificationLevel available'
        );
        if (p) {
            payload.providerId = p._id;
            payload.verificationStatus = p.verificationStatus;
            payload.verificationLevel = p.verificationLevel;
            payload.available = p.available;
        }
    }
    return payload;
};