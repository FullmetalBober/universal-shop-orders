declare type Basket = {
  _id: string;
  user: string | User;
  products: BasketState[];
  createdAt: Date;
  updatedAt: Date;
};

declare type BasketState = {
  product: string | Product;
  quantity: number;
};
