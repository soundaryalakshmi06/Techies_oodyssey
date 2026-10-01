export const notFound = (req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || 'Server error';

    if (err.name === 'ValidationError') {
        status = 400;
        message = Object.values(err.errors).map((e) => e.message).join(', ');
    } else if (err.code === 11000) {
        status = 409;
        const field = Object.keys(err.keyValue || {})[0] || 'Value';
        message = `${field} already exists`;
    } else if (err.name === 'CastError') {
        status = 400;
        message = `Invalid ${err.path}`;
    }

    if (status >= 500) console.error(err);
    res.status(status).json({ message });
};