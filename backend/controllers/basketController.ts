import Basket from '../models/basketModel';
import * as factory from './handlerFactory';

export const getAllBaskets = factory.getAll(Basket);
export const getBasket = factory.getOne(Basket);
export const createBasket = factory.createOne(Basket);
export const updateBasket = factory.updateOne(Basket);
export const deleteBasket = factory.deleteOne(Basket);
