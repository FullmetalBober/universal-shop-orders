import mongoose from 'mongoose';
import slugifyModelFunc from '../utils/slugifyModelFunc';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Product must have a name'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product must belong to a category'],
  },
  price: {
    type: Number,
    required: [true, 'Product must have a price'],
  },
  images: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    default: ['/images/productDefault.jpg'],
  },
  brand: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    min: 0,
    step: 1,
    default: 0,
    required: [true, 'Product must have a stock'],
  },
  characteristics: [
    {
      name: {
        type: String,
        trim: true,
        required: [true, 'Characteristic must have a name'],
      },
      parameter: {
        type: String,
        trim: true,
        required: [true, 'Characteristic must have a parameter'],
      },
    },
  ],
  slug: String,
});

slugifyModelFunc(productSchema, 'name');

const Product = mongoose.model('Product', productSchema);

export default Product;
