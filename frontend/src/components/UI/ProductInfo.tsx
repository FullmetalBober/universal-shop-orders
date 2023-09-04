interface Props {
  className?: string;
  _id: string;
  parameters: {
    _id: string;
    name: string;
    parameter: string;
  }[];
}

const productId = (id: string) => {
  return id.slice(0, 8);
};

const ProductInfo = (props: Props) => {
  const { _id, parameters } = props;

  const wrapperClass = `flex flex-wrap gap-1 ${props.className}`;
  return (
    <p class={wrapperClass}>
      <div className='badge badge-outline'>ID: {productId(_id)}</div>
      {parameters.map(characteristic => (
        <div key={characteristic._id} className='badge badge-outline'>
          {characteristic.parameter}
        </div>
      ))}
    </p>
  );
};

export default ProductInfo;
