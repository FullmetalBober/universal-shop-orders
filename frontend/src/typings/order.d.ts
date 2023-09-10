declare type Order = {
  _id: string;
  user: string | User;
  products: BasketState &
    {
      price: number;
    }[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};
