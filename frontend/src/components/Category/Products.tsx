import { Link } from 'preact-router';
import { currencyFormatter } from '../../utils/text';

interface Props {
  products: Product[];
}

const setHref = (slug: string) => {
  return `/product/${slug}`;
};

const productId = (id: string) => {
  return id.slice(0, 8);
};

const Products = (props: Props) => {
  const { products } = props;

  return (
    <section>
      {products.map(product => (
        <div class='card card-side my-3 bg-base-100 shadow-xl'>
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
            <p class='flex flex-wrap gap-1'>
              <div class='badge badge-outline'>
                ID: {productId(product._id)}
              </div>
              {product.characteristics.map(characteristic => (
                <div class='badge badge-outline'>
                  {characteristic.parameter}
                </div>
              ))}
            </p>
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
