import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Gallery from './Gallery';
import Loading from '../UI/Loading';
import ProductInfo from '../UI/ProductInfo';
import { currencyFormatter } from '../../utils/text';
import BasketButton from './BasketButton';
import { getProductBySlug } from '../../api/products';

const defaultImg = '/images/productDefault.jpg';

const Product = () => {
  const { productSlug } = useParams();

  const productQuery = useQuery({
    queryKey: ['product', productSlug],
    queryFn: () => getProductBySlug(productSlug!),
    enabled: !!productSlug,
  });

  if (productQuery.isInitialLoading) return <Loading />;
  if (!productQuery.data) return <div>Product not found</div>; //TODO: 404 page

  let imgs = [defaultImg];
  imgs = [productQuery.data.imageCover, ...productQuery.data.images];

  return (
    <main className='hero justify-items-start bg-base-200'>
      <div className='hero-content flex-col justify-items-start lg:flex-row'>
        {productQuery.data && <Gallery images={imgs} />}
        <div>
          <h1 className='text-5xl font-bold'>{productQuery.data.name}</h1>
          <h2 className='text-4xl font-bold'>
            {currencyFormatter(productQuery.data.price)}
          </h2>
          {
            <ProductInfo
              _id={productQuery.data._id}
              parameters={productQuery.data.characteristics}
              className='py-6 child:badge-lg'
            />
          }
          <BasketButton product={productQuery.data} />
        </div>
      </div>
    </main>
  );
};

export default Product;
