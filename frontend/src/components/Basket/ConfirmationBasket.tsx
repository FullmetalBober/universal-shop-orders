const ConfirmationBasket = () => {
  return (
    <section className='card md:w-96 bg-base-200 text-base-content'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>Сума</h2>
        <p>Ціна</p>
        <div className='card-actions w-full'>
          <button className='btn btn-primary w-full'>Оформити замовлення</button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationBasket;
