import { useState } from 'preact/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from './Button';
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
  const [timeoutID, setTimeoutID] = useState(0);
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

  const basketProducts = basket.products;
  let productIndex = basketProducts.findIndex(
    item => item.product === product._id
  );
  if (productIndex === -1) {
    basketProducts.push(toObjMutable(product._id, 0));
    productIndex = basketProducts.length - 1;
  }

  const addToBasketHandler = () => {
    basketProducts[productIndex].quantity += 1;
    updateBasketMutate(basketProducts);
  };

  const subtractFromBasketHandler = () => {
    basketProducts[productIndex].quantity -= 1;
    if (basketProducts[productIndex].quantity === 0)
      basketProducts.splice(productIndex, 1);

    updateBasketMutate([...basketProducts]);
  };

  const updateBasketMutate = (data: any) => {
    clearTimeout(timeoutID);
    setTimeoutID(
      setTimeout(() => {
        updateBasketMutation.mutate(data);
      }, 1000)
    );
  };

  const productInBasket = basketProducts[productIndex];
  const buttonDisabled = product.stock - productInBasket.quantity <= 0;
  return (
    <>
      {!productInBasket.quantity && (
        <Button
          onClick={addToBasketHandler}
          disabled={buttonDisabled}
          className='btn btn-primary'
        >
          У кошик
        </Button>
      )}
      {!!productInBasket.quantity && (
        <div className='join'>
          <Button
            onClick={subtractFromBasketHandler}
            className='btn btn-primary join-item'
          >
            -
          </Button>

          <span className='btn join-item'>{productInBasket.quantity}</span>

          <Button
            onClick={addToBasketHandler}
            disabled={buttonDisabled}
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
