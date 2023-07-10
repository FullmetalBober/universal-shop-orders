import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailResetToken?: string;
  emailResetExpires?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      immutable: true,
      required: [true, 'User must have a name'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      required: [true, 'User must have an email'],
    },
    photo: {
      type: String,
      trim: true,
      default: '/images/userDefault.jpg',
    },
    role: {
      type: String,
      trim: true,
      enum: ['unconfirmed', 'user', 'moderator', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
      required: [true, 'User must have a password'],
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, el: string): boolean {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
      required: [true, 'User must have a password confirmation'],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailResetToken: String,
    emailResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

const partialFilterExpression = { role: { $ne: 'unconfirmed' } };

userSchema.index({ email: 1 }, { unique: true, partialFilterExpression });

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 7 * 24 * 60 * 60,
    partialFilterExpression,
  }
);

userSchema.index(
  { role: 1 },
  { unique: true, partialFilterExpression: { role: 'admin' } }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 10000);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createResetToken = function (field: 'email' | 'password') {
  const resetTokenField = `${field}ResetToken`;
  const resetTokenExpiresField = `${field}ResetExpires`;
  const resetToken = crypto.randomBytes(32).toString('hex');

  this[resetTokenField] = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this[resetTokenExpiresField] = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
