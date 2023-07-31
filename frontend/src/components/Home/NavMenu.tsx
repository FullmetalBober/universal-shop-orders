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
    <nav className='navbar bg-base-100'>
      <div className='navbar-start' />
      <div class='navbar-center tabs'>
        {menuTypes.map(type => (
          <ul key={type} class='dropdown dropdown-hover'>
            <li tabIndex={0}>
              <a class='tab tab-bordered tab-lg hover:tab-active'>{type}</a>
            </li>
            <ul tabIndex={0} className='menu dropdown-content menu-lg z-10'>
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
          </ul>
        ))}
      </div>
      <div className='navbar-end' />
    </nav>
  );
};

export default NavMenu;
