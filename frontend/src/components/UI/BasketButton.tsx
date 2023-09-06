import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from './Button';
import getId from '../../utils/getId';
import { useGetBasket } from '../../hooks/use-user';
import { updateBasket } from '../../api/baskets';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

const toObjMutable = (product: string, quantity: number) => {
  return { product, quantity };
};

const BasketButton = (props: Props) => {
  const { product } = props;
  const queryClient = useQueryClient();
  const basketQuery = useGetBasket();
  const updateBasketMutation = useMutation({
    mutationFn: updateBasket,
    onSuccess: data => {
      queryClient.setQueryData(['basket'], data);
    },
  });

  const basket = basketQuery.data;

  if (basketQuery.isInitialLoading)
    return (
      <Button className='btn btn-primary' loadingMode>
        Завантаження
      </Button>
    );
  if (!basket)
    return (
      <Link to='/auth/login' className='btn btn-primary'>
        Увійдіть щоб додати в кошик
      </Link>
    );

  let basketProduct =
    basket.products.find(item => getId(item.product) === product._id) || null;
  if (!basketProduct) {
    basket.products.push(toObjMutable(product._id, 0));
    basketProduct = basket.products[basket.products.length - 1];
  }

  const addToBasketHandler = () => {
    if (!basketProduct) return;
    basketProduct.quantity += 1;
    updateBasketMutation.mutate(basket);
  };

  const subtractFromBasketHandler = () => {
    if (!basketProduct) return;
    basketProduct.quantity -= 1;
    if (basketProduct.quantity === 0)
      basket.products = basket.products.filter(
        item => item.product !== product._id
      );
    updateBasketMutation.mutate(basket);
  };

  const buttonDisabled = product.stock - basketProduct.quantity <= 0;
  return (
    <>
      {!basketProduct.quantity && (
        <Button
          onClick={addToBasketHandler}
          disabled={buttonDisabled}
          className='btn btn-primary'
        >
          У кошик
        </Button>
      )}
      {!!basketProduct.quantity && (
        <div className='join'>
          <Button
            onClick={subtractFromBasketHandler}
            disabled={updateBasketMutation.isLoading}
            className='btn btn-primary join-item'
          >
            -
          </Button>

          <span className='btn join-item'>{basketProduct.quantity}</span>

          <Button
            onClick={addToBasketHandler}
            disabled={buttonDisabled || updateBasketMutation.isLoading}
            className='btn btn-primary join-item'
          >
            +
          </Button>
        </div>
      )}
    </>
  );
};

export default BasketButton;
