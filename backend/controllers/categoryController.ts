import Category from '../models/categoryModel';
import * as factory from './handlerFactory';

export const getAllCategories = factory.getAll(Category);
export const getCategory = factory.getOne(Category);
export const getCategoryBySlug = factory.getOneBySlug(Category);
export const createCategory = factory.createOne(Category);
export const updateCategory = factory.updateOne(Category);
export const deleteCategory = factory.deleteOne(Category);
