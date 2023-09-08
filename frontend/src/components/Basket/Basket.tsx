import { useQuery } from '@tanstack/react-query';
import ConfirmationBasket from './ConfirmationBasket';
import { getBasket } from '../../api/baskets';

const BasketParams = {
  populate: true,
};

const Basket = () => {
  const basketQuery = useQuery({
    queryKey: ['basket', BasketParams],
    queryFn: ({ signal }) => getBasket({ signal, params: BasketParams }),
  });

  const totalPrice =
    basketQuery.data?.products.reduce(
      (acc, item) => acc + (item.product as Product).price * item.quantity,
      0
    ) || 0;

  return (
    <main className='my-2 gap-3 md:flex'>
      <div class='w-full'>Baskets</div>
      <ConfirmationBasket price={totalPrice} />
    </main>
  );
};

export default Basket;
