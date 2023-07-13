import Product from '../models/productModel';
import * as factory from './handlerFactory';

export const getAllProducts = factory.getAll(Product);
export const getProduct = factory.getOne(Product);
export const createProduct = factory.createOne(Product);
export const updateProduct = factory.updateOne(Product);
export const deleteProduct = factory.deleteOne(Product);
