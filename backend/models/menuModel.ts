import mongoose from 'mongoose';
import slugifyModelFunc from '../utils/slugifyModelFunc';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Menu must have a name'],
  },
  order: {
    type: Number,
    unique: true,
    min: 0,
    step: 1,
    required: [true, 'Menu must have an order'],
  },
  slug: String,
});

slugifyModelFunc(menuSchema, 'name');

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
