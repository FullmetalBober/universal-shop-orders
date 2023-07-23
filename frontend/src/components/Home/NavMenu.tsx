import { useAppSelector } from '../../store';

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const NavMenu = () => {
  const categories = useAppSelector(state => state.category.items);
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
              <a class='tab tab-bordered hover:tab-active'>{type}</a>
            </li>
            <ul tabIndex={0} className='menu dropdown-content'>
              {categories
                .filter(category => category.menuType === type.toLowerCase())
                .map(category => (
                  <li>
                    <a>{category.name}</a>
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
