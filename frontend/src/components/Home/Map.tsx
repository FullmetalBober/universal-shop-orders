const Map = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <section class='w-full my-2'>
      <div class='card mx-auto w-[350px] md:w-[500px] bg-base-100 shadow-xl'>
        <div class='card-body'>
          <h1 class='card-title mx-auto'>Як нас знайти</h1>
        </div>
        <figure>
          <iframe
            loading='lazy'
            class='mx-auto h-[450px] w-full'
            src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Space+Needle,Seattle+WA`}
          />
        </figure>
      </div>
    </section>
  );
};

export default Map;
