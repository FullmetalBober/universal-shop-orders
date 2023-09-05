import { Link } from 'react-router-dom';
import { currencyFormatter } from '../../utils/text';
import ProductInfo from '../UI/ProductInfo';
import BasketButton from '../UI/BasketButton';

type Props = {
  products: Product[];
};

const setHref = (slug: string) => {
  return `/product/${slug}`;
};

const Products = (props: Props) => {
  const { products } = props;

  return (
    <section>
      {products.map(product => (
        <div
          key={product._id}
          className='card card-side card-compact my-3 bg-base-100 shadow-xl md:card-normal'
        >
          <figure>
            <Link to={setHref(product.slug)} className='flex items-center'>
              <img
                src={product.imageCover}
                alt={product.name}
                className='w-32 md:w-56'
              />
            </Link>
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>
              <Link to={setHref(product.slug)}>{product.name}</Link>
            </h2>
            <h3 className='card-title'>{currencyFormatter(product.price)}</h3>
            {
              <ProductInfo
                _id={product._id}
                parameters={product.characteristics}
              />
            }
            <div className='card-actions justify-end'>
              <BasketButton product={product} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
