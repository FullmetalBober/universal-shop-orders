import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categories';
import Loading from '../UI/Loading';
import { capitalizeFirstLetter } from '../../utils/text';

const NavMenu = () => {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const menuTypes = [
    ...new Set(
      categoriesQuery.data?.map(category =>
        capitalizeFirstLetter(category.menuType)
      )
    ),
  ];

  const subMenu = (type: string) =>
    categoriesQuery.data?.filter(
      category => category.menuType === type.toLowerCase()
    ) || [];

  if (categoriesQuery.isLoading) return <Loading />;
  return (
    <nav className='navbar -mt-2 justify-center bg-base-100'>
      <ul className='flex-wrap'>
        {menuTypes.map(type => (
          <li key={type} tabIndex={0} className='group dropdown dropdown-hover'>
            <label className='btn btn-ghost rounded-btn btn-lg group-hover:btn-active group-focus:btn-active'>
              {type}
            </label>
            <ul
              tabIndex={0}
              className='menu dropdown-content rounded-box menu-lg z-10 w-52 bg-base-100 p-2 shadow'
            >
              {subMenu(type).map(category => (
                <li key={category._id}>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
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
