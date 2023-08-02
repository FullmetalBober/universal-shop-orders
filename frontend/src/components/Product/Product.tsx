import useFetch from 'react-fetch-hook';
import Carousel from './Сarousel';
import Loading from '../UI/Loading';
import ProductInfo from '../UI/ProductInfo';

const defaultImg = '/images/productDefault.jpg';

interface Props {
  productSlug: string;
}

const Product = (props: Props) => {
  const { productSlug } = props;

  const { data: productData, isLoading: productIsLoading } = useFetch<
    Response<Product>
  >(`/api/v1/products/slug/${productSlug}`);
  const product = productData?.data.data;

  let imgs = [defaultImg];
  if (product) imgs = [product.imageCover, ...product.images];

  if (productIsLoading) return <Loading />;
  if (!product) return <div>Product not found</div>; //TODO: 404 page
  return (
    <main class='hero justify-items-start bg-base-200'>
      <div class='hero-content flex-col justify-items-start lg:flex-row'>
        {product && <Carousel images={imgs} />}
        <div>
          <h1 class='text-5xl font-bold'>{product.name}</h1>
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
