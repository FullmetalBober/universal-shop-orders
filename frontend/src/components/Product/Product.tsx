import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Gallery from './Gallery';
import Loading from '../UI/Loading';
import ProductInfo from '../UI/ProductInfo';
import { currencyFormatter } from '../../utils/text';

const defaultImg = '/images/productDefault.jpg';

const Product = () => {
  const { productSlug } = useParams();

  const [{ data: productData, loading: productIsLoading }] = useAxios<
    Response<Product>
  >({
    url: `/api/v1/products/slug/${productSlug}`,
  });
  const product = productData?.data.data;

  let imgs = [defaultImg];
  if (product) imgs = [product.imageCover, ...product.images];

  if (productIsLoading) return <Loading />;
  if (!product) return <div>Product not found</div>; //TODO: 404 page
  return (
    <main class='hero justify-items-start bg-base-200'>
      <div class='hero-content flex-col justify-items-start lg:flex-row'>
        {product && <Gallery images={imgs} />}
        <div>
          <h1 class='text-5xl font-bold'>{product.name}</h1>
          <h2 class='text-4xl font-bold'>{currencyFormatter(product.price)}</h2>
          {
            <ProductInfo
              _id={product._id}
              parameters={product.characteristics}
              class='py-6 child:badge-lg'
            />
          }
          <button class='btn btn-primary'>У кошик</button>
        </div>
      </div>
    </main>
  );
};

export default Product;
