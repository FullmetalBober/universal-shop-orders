import { Link } from 'preact-router';
import { currencyFormatter } from '../../utils/text';
import ProductInfo from '../UI/ProductInfo';

interface Props {
  products: Product[];
}

const setHref = (slug: string) => {
  return `/product/${slug}`;
};

const Products = (props: Props) => {
  const { products } = props;

  return (
    <section>
      {products.map(product => (
        <div class='card card-side card-compact my-3 bg-base-100 shadow-xl md:card-normal'>
          <figure>
            <Link href={setHref(product.slug)} class='flex items-center'>
              <img src={product.imageCover} alt='Movie' class='w-32 md:w-56' />
            </Link>
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>
              <Link href={setHref(product.slug)}>{product.name}</Link>
            </h2>
            <h3 class='card-title'>{currencyFormatter(product.price)}</h3>
            {
              <ProductInfo
                _id={product._id}
                parameters={product.characteristics}
              />
            }
            <div class='card-actions justify-end'>
              <button class='btn btn-primary'>У кошик</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
