import { useParams } from 'react-router-dom';
import { useGetOrders } from '../../hooks/use-user';
import NavMenu from './NavMenu';
import Loading from '../UI/Loading';
import OrdersList from './OrdersList';

const Orders = () => {
  const status = useParams().status;
  const orderQuery = useGetOrders(status);

  return (
    <main>
      <NavMenu />
      {orderQuery.isLoading && <Loading />}
      {!orderQuery.isLoading && orderQuery.data && (
        <OrdersList orders={orderQuery.data} />
      )}
    </main>
  );
};

export default Orders;
