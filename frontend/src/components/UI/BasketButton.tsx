import { toast } from 'react-toastify';
import { useAppSelector } from '../../store';
import { useAppDispatch } from '../../store';
import { updateBasket } from '../../store/basket-actions';
import Button from './Button';
import Loading from './Loading';
import getId from '../../utils/getId';

interface IProps {
  product: Product;
}

const toObjDispatch = (productId: string, quantity: number) => {
  return { productId, quantity };
};

const BasketButton = (props: IProps) => {
  const { product } = props;
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector(state => state.user);
  const { basket, isLoading } = useAppSelector(state => state.basket);

  const basketProducts = basket?.products;
  // console.log(basketProducts);
  const quantity = basketProducts?.find(
    item => getId(item.product) === product._id
  )?.quantity;

  const checkLogin = () => {
    if (isAuthenticated) return;
    toast.error('Спочатку увійдіть в обліковий запис!');
    throw new Error('Спочатку увійдіть в обліковий запис!');
  };

  const addToBasketHandler = () => {
    checkLogin();
    const count = quantity ? quantity + 1 : 1;
    dispatch(updateBasket(toObjDispatch(product._id, count)));
  };

  const subtractFromBasketHandler = () => {
    checkLogin();
    const count = quantity ? quantity - 1 : 0;
    dispatch(updateBasket(toObjDispatch(product._id, count)));
  };

  const buttonDisabled = product.stock <= 0;
  if (isLoading)
    return (
      <button className='btn btn-primary' disabled>
        <Loading /> Завантаження
      </button>
    );
  return (
    <>
      {!quantity && (
        <Button
          onClick={addToBasketHandler}
          disabled={buttonDisabled}
          className='btn btn-primary'
        >
          У кошик
        </Button>
      )}
      {quantity && (
        <div className='join'>
          <Button
            onClick={subtractFromBasketHandler}
            disabled={buttonDisabled}
            className='btn btn-primary join-item'
          >
            -
          </Button>

          <span className='btn join-item'>{quantity}</span>

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
