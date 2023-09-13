import { NavLink, NavLinkProps } from 'react-router-dom';

const menuTypes = [
  {
    name: 'pending',
    label: 'Очікується',
  },
  {
    name: 'processing',
    label: 'В обробці',
  },
  {
    name: 'completed',
    label: 'Завершено',
  },
  {
    name: 'cancelled',
    label: 'Скасовано',
  },
];

const navClassName: NavLinkProps['className'] = navData => {
  const { isActive } = navData;
  return `btn btn-ghost rounded-btn btn-lg ${isActive && 'btn-disabled'}`;
};

const NavMenu = () => {
  return (
    <nav className='navbar -mt-2 justify-center bg-base-100'>
      <ul className='flex-wrap'>
        {menuTypes.map(type => (
          <li key={type}>
            <NavLink to={`/orders/${type.name}`} className={navClassName}>
              {type.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
