const Map = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <section className='my-2'>
      <div className='card mx-auto w-full sm:w-[500px] bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h1 className='card-title mx-auto'>Як нас знайти</h1>
        </div>
        <figure>
          <iframe
            loading='lazy'
            className='mx-auto h-[450px] w-full'
            src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Space+Needle,Seattle+WA`}
          />
        </figure>
      </div>
    </section>
  );
};

export default Map;
