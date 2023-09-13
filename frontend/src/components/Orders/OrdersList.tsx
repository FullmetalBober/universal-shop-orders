import OrderItem from './OrderItem';

type Props = {
  orders: Order[];
};

const OrdersList = (props: Props) => {
  return (
    <div className='orders-list'>
      {props.orders.map(order => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
