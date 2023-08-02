interface Props {
  images: string[];
}

const Carousel = (props: Props) => {
  const { images } = props;

  return <img src={images[0]} className='max-w-sm rounded-lg shadow-2xl' />;
};

export default Carousel;
