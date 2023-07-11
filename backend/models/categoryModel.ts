import mongoose from 'mongoose';
import slugifyModelFunc from '../utils/slugifyModelFunc';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Category must have a name'],
  },
  menuType: {
    type: String,
    trim: true,
    required: [true, 'Category must have a menu type'],
  },
  characteristics: [
    {
      name: {
        type: String,
        trim: true,
        required: [true, 'Characteristic must have a name'],
      },
      parameters: {
        type: [String],
        trim: true,
        required: [true, 'Characteristic must have parameters'],
      },
    },
  ],
  slug: String,
});

slugifyModelFunc(categorySchema, 'name');

const Category = mongoose.model('Category', categorySchema);

export default Category;
