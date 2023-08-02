interface Props {
  class?: string;
  _id: string;
  parameters: {
    name: string;
    parameter: string;
  }[];
}

const productId = (id: string) => {
  return id.slice(0, 8);
};

const ProductInfo = (props: Props) => {
  const { _id, parameters } = props;

  const wrapperClass = `flex flex-wrap gap-1 ${props.class}`;
  return (
    <p class={wrapperClass}>
      <div class='badge badge-outline'>ID: {productId(_id)}</div>
      {parameters.map(characteristic => (
        <div class='badge badge-outline'>{characteristic.parameter}</div>
      ))}
    </p>
  );
};

export default ProductInfo;
