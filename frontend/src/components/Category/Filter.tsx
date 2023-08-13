import { ChangeEvent } from 'preact/compat';
import { capitalizeFirstLetter } from '../../utils/text';

interface Props {
  category: Category;
  onFilterChange: (name: string, parameter: string) => void;
}

const Filter = (props: Props) => {
  const { category } = props;

  const handleFilterChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    props.onFilterChange(name, value);
  };

  return (
    <section class='md:w-[345px]'>
      {category &&
        category.characteristics.map(characteristic => (
          <div
            key={characteristic._id}
            class='collapse collapse-arrow my-1 border border-base-300 bg-base-200'
          >
            <input type='checkbox' />
            <div class='collapse-title text-xl font-medium'>
              {capitalizeFirstLetter(characteristic.name)}
            </div>
            <div class='collapse-content'>
              <p>
                {characteristic.parameters.map(param => (
                  <div key={param} class='form-control'>
                    <label class='label cursor-pointer justify-start gap-2'>
                      <input
                        type='checkbox'
                        name={characteristic.name}
                        value={param}
                        onChange={handleFilterChanged}
                        class='checkbox checkbox-sm'
                      />
                      <span class='label-text'>
                        {capitalizeFirstLetter(param)}
                      </span>
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
