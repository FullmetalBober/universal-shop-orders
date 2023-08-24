import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Category must have a name'],
    },
    menuType: {
      type: String,
      trim: true,
      toLowerCase: true,
      required: [true, 'Category must have a menu type'],
    },
    characteristics: [
      {
        name: {
          type: String,
          trim: true,
          toLowerCase: true,
          required: [true, 'Characteristic must have a name'],
        },
        parameters: {
          type: [
            {
              type: String,
              trim: true,
              toLowerCase: true,
            },
          ],
          trim: true,
          required: [true, 'Characteristic must have parameters'],
        },
      },
    ],
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
