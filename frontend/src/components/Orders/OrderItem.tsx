import { currencyFormatter } from '../../utils/text';
import ProductItemCompact from '../UI/ProductItemCompact';

type Props = { order: Order };

const OrderItem = (props: Props) => {
  const { order } = props;

  const price = order.products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const createdAt = new Date(order.createdAt).toLocaleDateString();

  return (
    <div className='card bg-base-100 shadow-xl my-3'>
      <div className='card-body'>
        <h2 className='card-title'>{order._id}</h2>
        <div className='card-actions'>
          {order.products.map(product => (
            <ProductItemCompact key={product} product={product} />
          ))}
        </div>
        <div className='card-title card-actions justify-between'>
          <span>{currencyFormatter(price)}</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
