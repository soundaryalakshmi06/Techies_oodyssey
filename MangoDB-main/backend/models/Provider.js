import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

        // denormalised so the frontend gets a flat object
        name: { type: String, required: true, trim: true },
        email: { type: String, lowercase: true, trim: true },
        phone: { type: String, trim: true },

        category: { type: String, required: true, trim: true },
        services: { type: [String], default: [] },
        experienceYears: { type: Number, default: 0, min: 0 },
        priceFrom: { type: Number, default: 0, min: 0 },
        languages: { type: [String], default: ['Tamil'] },
        address: { type: String, trim: true },

        // GeoJSON. Left undefined until a valid point is provided.
        location: {
            type: { type: String, enum: ['Point'] },
            coordinates: { type: [Number], default: undefined },
        },

        available: { type: Boolean, default: true },

        verificationStatus: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'MoreInfo'],
            default: 'Pending',
        },
        // Skilled workers without certificates are NOT rejected: they get a lower tier.
        verificationLevel: {
            type: String,
            enum: ['basic', 'experience', 'certified'],
            default: 'basic',
        },
        verificationReason: { type: String, default: '' },
        documents: [{ docType: String, url: String }],

        rating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
        completedJobs: { type: Number, default: 0 },
    },
    { timestamps: true }
);

providerSchema.index({ location: '2dsphere' });
providerSchema.index({ verificationStatus: 1, category: 1 });

export default mongoose.model('Provider', providerSchema);