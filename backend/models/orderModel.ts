import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user'],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Order must belong to a product'],
      },
      quantity: {
        type: Number,
        required: [true, 'Order must have a quantity'],
      },
      price: {
        type: Number,
        required: [true, 'Order must have a price'],
      },
    },
  ],
  status: {
    type: String,
    trim: true,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
