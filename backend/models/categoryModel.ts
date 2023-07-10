import mongoose from 'mongoose';
import slugifyModelFunc from '../utils/slugifyModelFunc';

interface ICategory extends mongoose.Document {
  name: string;
  menu: mongoose.Schema.Types.ObjectId;
  characteristics: [
    {
      name: string;
      parameters: [string];
    }
  ];
  slug: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Category must have a name'],
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: [true, 'Category must belong to a menu'],
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

module.exports = Category;
