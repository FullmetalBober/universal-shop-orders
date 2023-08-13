import { Link } from 'preact-router';
import { capitalizeFirstLetter } from '../../utils/text';

interface Props {
  categories: Category[];
}

const NavMenu = (props: Props) => {
  const { categories } = props;
  const menuTypes = [
    ...new Set(
      categories.map(category => capitalizeFirstLetter(category.menuType))
    ),
  ];

  return (
    <nav class='navbar -mt-2 justify-center bg-base-100'>
      <ul class='flex-wrap'>
        {menuTypes.map(type => (
          <li tabIndex={0} class='group dropdown dropdown-hover'>
            <label class='btn btn-ghost rounded-btn btn-lg group-hover:btn-active group-focus:btn-active'>
              {type}
            </label>
            <ul
              tabIndex={0}
              class='menu dropdown-content rounded-box menu-lg z-10 w-52 bg-base-100 p-2 shadow'
            >
              {categories
                .filter(category => category.menuType === type.toLowerCase())
                .map(category => (
                  <li>
                    <Link href={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
