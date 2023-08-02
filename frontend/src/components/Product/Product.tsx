import useFetch from 'react-fetch-hook';
import Carousel from './Сarousel';
import Loading from '../UI/Loading';

interface Props {
  productSlug: string;
}

const Product = (props: Props) => {
  const { productSlug } = props;

  const { data: productData, isLoading: productIsLoading } = useFetch<
    Response<Product>
  >(`/api/v1/products/slug/${productSlug}`);
  const product = productData?.data.data;

  let imgs;
  console.log(product);
  if (product) imgs = [product?.imageCover, ...product.images];

  if (productIsLoading) return <Loading />;
  return <main>{product && <Carousel images={imgs!} />}</main>;
};

export default Product;
