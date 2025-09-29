// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true },
  avatar: { type: String, default: null },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  addresses: [{
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: Boolean
  }],
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  socialLogins: {
    googleId: String,
    facebookId: String
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  isVerified: { type: Boolean, default: false },
  lastLogin: Date,
  loginCount: { type: Number, default: 0 }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate OTP
userSchema.methods.generateOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otp = {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  };
  return otp;
};

module.exports = mongoose.model('User', userSchema);