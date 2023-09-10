import { useQuery } from '@tanstack/react-query';
import ConfirmationBasket from './ConfirmationBasket';
import { getBasket } from '../../api/baskets';
import ProductsList from '../UI/ProductsList';

const BasketParams = {
  populate: true,
};

const Basket = () => {
  const basketQuery = useQuery({
    queryKey: ['basket', 'populated'],
    queryFn: ({ signal }) => getBasket({ signal, params: BasketParams }),
  });

  const basketProducts = basketQuery.data?.products || [];

  const totalPrice =
    basketProducts.reduce(
      (acc, item) => acc + (item.product as Product).price * item.quantity,
      0
    ) || 0;

  const products = basketProducts.map(item => ({
    ...(item.product as Product),
    quantity: item.quantity,
  }));

  return (
    <main className='my-2 gap-3 md:flex'>
      <ProductsList products={products} className='w-full' />
      <ConfirmationBasket price={totalPrice} />
    </main>
  );
};

export default Basket;
