declare interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  verified: boolean;
  basket: Basket;
  orders: Order[];
}
