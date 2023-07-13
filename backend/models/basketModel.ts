import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Basket must belong to a user'],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Basket must belong to a product'],
      },
      quantity: {
        type: Number,
        required: [true, 'Basket must have a quantity'],
      },
    },
  ],
});

const Basket = mongoose.model('Basket', basketSchema);

export default Basket;
