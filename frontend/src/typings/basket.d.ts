declare interface Basket {
  _id: string;
  user: string | User;
  products: Array<{
    product: string | Product;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
