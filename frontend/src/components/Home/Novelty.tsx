import useFetch from 'react-fetch-hook';
import { Link } from 'preact-router';
import Carousel from 'react-multi-carousel';
import Loading from '../UI/Loading';
import { currencyFormatter } from '../../utils/text';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Novelty = () => {
  const { isLoading, data } = useFetch<any>('/api/v1/products?limit=20');
  const products: Product[] = data?.data.data;

  return (
    <section>
      <h1 class='card-title text-2xl'>Новинка</h1>
      {isLoading && <Loading />}
      {products && (
        <Carousel responsive={responsive} showDots={true} infinite={true}>
          {products.map(product => (
            <Link
              href={`/product/${product.slug}`}
              key={product._id}
              class='card card-compact w-96 bg-base-100 shadow-xl'
            >
              <figure>
                <img src={product.imageCover} alt={product.name} />
              </figure>
              <div class='card-body items-center text-center'>
                <h2 class='card-title'>{product.name}</h2>
                <h3 class='card-title'>{currencyFormatter(product.price)}</h3>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default Novelty;
