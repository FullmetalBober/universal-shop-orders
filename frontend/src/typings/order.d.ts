declare type Order = {
  _id: string;
  user: string | User;
  products: OrderState[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};

declare type OrderState = BasketState & { price: number };
