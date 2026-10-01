import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: { type: String, trim: true, unique: true, sparse: true },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,
        },
        role: { type: String, enum: ['customer', 'provider', 'admin'], default: 'customer' },
        preferredLanguage: { type: String, default: 'Tamil' },
        city: { type: String, default: 'Chennai' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', userSchema);