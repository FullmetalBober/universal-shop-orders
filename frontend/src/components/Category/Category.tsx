import useAxios from 'axios-hooks';
import { useState } from 'preact/hooks';
import Loading from '../UI/Loading';
import Filter from './Filter';
import Products from './Products';
import Pagination from './Pagination';
import { useAppSelector } from '../../store';

const limit = '15';
interface Props {
  categorySlug: string;
  matches: {
    page: string;
  };
}

interface Filter {
  name: string;
  parameter: string;
}

const Category = (props: Props) => {
  const { matches, categorySlug } = props;
  let page: string | number = matches.page || '1';
  const [filter, setFilter] = useState<Filter[]>([]);

  // split filter array into array of arrays with same name
  const arrayFilters = filter.reduce((acc, el) => {
    const { name, parameter } = el;
    const index = acc.findIndex(el => el[0].name === name);
    if (index === -1) acc.push([{ name, parameter }]);
    else acc[index].push({ name, parameter });
    return acc;
  }, [] as Filter[][]);

  // get category
  const { isLoading: categoriesIsLoading, categories } = useAppSelector(
    state => state.category
  );
  const category = categories.find(category => category.slug === categorySlug);

  // create query params
  let queryParams = new URLSearchParams([]);
  const filterJson = JSON.stringify(arrayFilters);
  if (category?._id) queryParams.append('category', category._id);

  // fetch product count
  const [{ data: productCountData, loading: productCountIsLoading }] = useAxios<
    Response<number>
  >(`/api/v1/products/count?${queryParams}`, { manual: !category });
  const productCount = productCountData?.data.data;

  // add another params to query params
  if (filter.length > 0) queryParams.append('characteristics', filterJson);
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  // fetch products
  const [{ data: productsData, loading: productsIsLoading }] = useAxios<
    Response<Product[]>
  >(`/api/v1/products?${queryParams}`, { manual: !category });
  const products = productsData?.data.data;

  // handle filter change
  const onFilterChange = (name: string, parameter: string) => {
    setFilter(prevState => {
      const index = prevState?.findIndex(
        filter => filter.name === name && filter.parameter === parameter
      );

      if (index === -1) return [...prevState, { name, parameter }];
      return prevState?.filter(
        filter => filter.name !== name || filter.parameter !== parameter
      );
    });
  };

  const pageChangeHref = `/category/${categorySlug}`;
  const totalPages = Math.ceil(productCount! / +limit);
  page = +page;
  if (categoriesIsLoading) return <Loading />;
  return (
    <main class='my-2 gap-3 md:flex'>
      <Filter category={category!} onFilterChange={onFilterChange} />
      <div class='grow'>
        {(productsIsLoading || productCountIsLoading) && <Loading />}
        {products && <Products products={products} />}
        {!!productCount && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageChangeHref={pageChangeHref}
          />
        )}
      </div>
    </main>
  );
};

export default Category;
