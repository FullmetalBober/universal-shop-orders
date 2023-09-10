import { useQueryClient, useMutation } from '@tanstack/react-query';
import { currencyFormatter } from '../../utils/text';
import Button from '../UI/Button';
import { createOrder } from '../../api/order';

type Props = {
  price: number;
};

const ConfirmationBasket = ({ price }: Props) => {
  const queryClient = useQueryClient();
  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.setQueriesData(['basket'], []);
    },
  });

  const submitHandler = () => {
    orderMutation.mutate();
  };

  const buttonDisabled = price <= 0 || orderMutation.isLoading;
  return (
    <section className='card md:w-96 bg-base-200 text-base-content h-min'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>Кошик</h2>
        <p>{currencyFormatter(price)}</p>
        <div className='card-actions w-full'>
          <Button
            onClick={submitHandler}
            className='btn btn-primary w-full'
            loadingMode={orderMutation.isLoading}
            disabled={buttonDisabled}
          >
            Оформити замовлення
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationBasket;
