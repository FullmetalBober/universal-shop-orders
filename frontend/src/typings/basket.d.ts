declare type Basket = {
  _id: string;
  user: string | User;
  products: [
    {
      product: string | Product;
      quantity: number;
    },
  ];
  createdAt: Date;
  updatedAt: Date;
};
