import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import { text } from 'stream/consumers';

mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    imageCover: {
      type: String,
      trim: true,
      default: '/images/productDefault.jpg',
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
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
    slug: {
      type: String,
      slug: ['name', 'characteristics.parameter'],
      slugPaddingSize: 4,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  _id: 'text',
  name: 'text',
  slug: 'text',
  brand: 'text',
  'characteristics.parameter': 'text',
});

const Product = mongoose.model('Product', productSchema);

export default Product;
