import { Schema } from 'mongoose';
import slugify from 'slugify';

const slugifyModelFunc = (schema: Schema, name: string) => {
  schema.index({ slug: 1 });

  schema.pre('save', function (next) {
    this.slug = slugify(this[name], { lower: true });
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;
    if (!update || !update.name) return next();
    update.slug = slugify(update.name, { lower: true });
    next();
  });
};

export default slugifyModelFunc;
