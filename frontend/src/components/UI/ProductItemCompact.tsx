import { Link } from 'react-router-dom';

type Props = {
  product: OrderState;
};

const ProductItemCompact = ({ product }: Props) => {
  const ProductInfo = product.product as Product;
  const productLink = `/product/${ProductInfo.slug}`;

  return (
    <Link
      to={productLink}
      key={ProductInfo._id}
      className='indicator btn btn-link h-28 btn-circle'
    >
      <span className='indicator-item badge badge-secondary mt-1 mr-3'>
        {product.quantity}
      </span>
      <img
        className='mask mask-squircle'
        width={110}
        src={ProductInfo.imageCover}
      />
    </Link>
  );
};

export default ProductItemCompact;
