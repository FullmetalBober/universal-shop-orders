import { currencyFormatter } from '../../utils/text';
import Button from '../UI/Button';

type Props = {
  price: number;
};

const ConfirmationBasket = ({ price }: Props) => {
  const buttonDisabled = price <= 0;
  return (
    <section className='card md:w-96 bg-base-200 text-base-content'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>Кошик</h2>
        <p>{currencyFormatter(price)}</p>
        <div className='card-actions w-full'>
          <Button className='btn btn-primary w-full' disabled={buttonDisabled}>
            Оформити замовлення
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationBasket;
