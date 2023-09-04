import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Carousel from 'react-multi-carousel';
import Loading from '../UI/Loading';
import { currencyFormatter } from '../../utils/text';
import { getNoveltyProducts } from '../../api/products';

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
  const productsNoveltyQuery = useQuery({
    queryKey: ['products', 'novelty'],
    queryFn: () => getNoveltyProducts(),
  });

  if (productsNoveltyQuery.isLoading) return <Loading />;
  return (
    <section>
      <h1 className='card-title text-2xl'>Новинка</h1>
      {productsNoveltyQuery.data && (
        <Carousel
          responsive={responsive}
          arrows
          autoPlay
          showDots
          infinite
          containerClass='shadow-xl rounded-lg'
        >
          {productsNoveltyQuery.data.map(product => (
            <Link
              to={`/product/${product.slug}`}
              key={product._id}
              className='xs:max-w-xs card card-compact bg-base-100'
            >
              <figure>
                <img
                  src={product.imageCover}
                  alt={product.name}
                  className='rounded-lg'
                />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title'>{product.name}</h2>
                <h3 className='card-title'>
                  {currencyFormatter(product.price)}
                </h3>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default Novelty;
