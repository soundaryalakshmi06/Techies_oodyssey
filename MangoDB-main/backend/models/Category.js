import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Category name is required'], unique: true, trim: true },
        description: { type: String, trim: true, default: '' },
        icon: { type: String, default: '🛠️' },
        services: [
            {
                name: { type: String, required: true, trim: true },
                startingPrice: { type: Number, default: 0 },
            },
        ],
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model('Category', categorySchema);