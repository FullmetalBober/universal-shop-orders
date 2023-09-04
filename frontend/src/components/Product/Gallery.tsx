import Carousel from 'react-multi-carousel';

interface Props {
  images: string[];
}

const responsive = {
  all: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
  },
};

const Image = ({ img }: { img: string }) => (
  <img src={img} className='rounded-lg' alt={img} />
);

const Gallery = (props: Props) => {
  const { images } = props;

  return (
    <section className='w-80 max-w-sm rounded-lg shadow-2xl'>
      {images.length > 1 && (
        <Carousel
          responsive={responsive}
          autoPlay
          showDots
          infinite
          containerClass='rounded-lg'
        >
          {images.map((img, index) => (
            <Image key={index} img={img} />
          ))}
        </Carousel>
      )}
      {images.length === 1 && <Image img={images[0]} />}
    </section>
  );
};

export default Gallery;
