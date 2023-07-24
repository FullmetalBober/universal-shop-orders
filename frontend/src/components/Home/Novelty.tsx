import useFetch from 'react-fetch-hook';
import Loading from '../UI/Loading';
import { Link } from 'preact-router';

const Novelty = () => {
  const { isLoading, data } = useFetch<any>('/api/v1/products?limit=20');
  const products: Product[] = data?.data.data;

  return (
    <section>
      <h1 class='card-title text-2xl'>Novelty</h1>
      {isLoading && <Loading />}
      {products &&
        //TODO: Add a carousel
        products.map(product => (
          <Link
            key={product._id}
            href={`product/${product.slug}`}
            class='card card-compact w-96 bg-base-100 shadow-xl'
          >
            <figure>
              <img src={product.images[0]} alt={product.name} />
            </figure>
            <div class='card-body items-center text-center'>
              <h2 class='card-title'>{product.name}</h2>
              <h3 class='card-title'>{product.price}</h3>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Novelty;
