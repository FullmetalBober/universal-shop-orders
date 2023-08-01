import { currencyFormatter } from '../../utils/text';

interface Props {
  products: Product[];
}

const Products = (props: Props) => {
  const { products } = props;

  return (
    <section>
      {products.map(product => (
        <div class='card card-side my-3 bg-base-100 shadow-xl'>
          <figure>
            <img
              src={product.imageCover}
              alt='Movie'
              class='h-full w-56 object-fill'
            />
          </figure>
          <div class='card-body'>
            <h2 class='card-title'>{product.name}</h2>
            <h3 class='card-title'>{currencyFormatter(product.price)}</h3>
            <p class='flex flex-wrap gap-1'>
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
