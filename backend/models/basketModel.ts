import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Basket must belong to a user'],
      unique: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            unique: true,
            required: [true, 'Basket must belong to a product'],
          },
          quantity: {
            type: Number,
            min: [1, 'Quantity must be greater than 0'],
            step: 1,
            default: 1,
          },
        },
      ],
      required: [true, 'Basket must have at least one product'],
    },
  },
  {
    timestamps: true,
  }
);

basketSchema.index(
  { updatedAt: 1 },
  {
    expireAfterSeconds: 6 * 30 * 24 * 60 * 60, // 6 months
  }
);

const Basket = mongoose.model('Basket', basketSchema);

export default Basket;
