import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Basket must belong to a user'],
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Basket must belong to a product'],
        },
        quantity: {
          type: Number,
          min: [1, 'Quantity must be greater than 0'],
          default: 1,
        },
      },
    ],
    required: [true, 'Basket must have at least one product'],
  },
});

const Basket = mongoose.model('Basket', basketSchema);

export default Basket;
