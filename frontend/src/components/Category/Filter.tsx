interface IProps {
  category: Category;
}

const Filter = (props: IProps) => {
  const { category } = props;

  return (
    <section class='w-[345px]'>
      {category &&
        category.characteristics.map(characteristic => (
          <div className='collapse collapse-arrow my-1 border border-base-300 bg-base-200'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-medium'>
              {characteristic.name}
            </div>
            <div className='collapse-content'>
              <p>
                {characteristic.parameters.map(param => (
                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type='checkbox' className='checkbox checkbox-sm' />
                      <span className='label-text'>{param}</span>
                    </label>
                  </div>
                ))}
              </p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Filter;
