import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'preact/hooks';
import Loading from '../UI/Loading';
import Filter from './Filter';
import Products from './Products';
import Pagination from '../UI/Pagination';
import { getCountProducts, getProducts } from '../../api/products';
import { getCategories } from '../../api/categories';

const limit = '15';

type Filter = {
  name: string;
  parameter: string;
};

const Category = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let page: string | number = searchParams.get('page') || '1';
  const [filter, setFilter] = useState<Filter[]>([]);

  useEffect(() => window.scrollTo(0, 0), [page]);
  useEffect(() => setSearchParams({ page: '1' }), [filter]);

  // split filter array into array of arrays with same name
  const arrayFilters = filter.reduce((acc, el) => {
    const { name, parameter } = el;
    const index = acc.findIndex(el => el[0].name === name);
    if (index === -1) acc.push([{ name, parameter }]);
    else acc[index].push({ name, parameter });
    return acc;
  }, [] as Filter[][]);

  // get category
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    enabled: !!categorySlug,
    select: categories =>
      categories.find(category => category.slug === categorySlug),
  });

  if (!categoriesQuery.data) return <div>404</div>; //TODO 404 page

  // create query params
  let queryParams: QueryObject = {};
  const filterJson = JSON.stringify(arrayFilters);
  if (categoriesQuery.data?._id)
    queryParams.category = categoriesQuery.data._id;
  if (filter.length > 0) queryParams.characteristics = filterJson;

  // fetch product count
  const productsCountQuery = useQuery({
    queryKey: ['products', 'count', queryParams],
    queryFn: () => getCountProducts(queryParams),
    enabled: !!categoriesQuery.data,
  });

  // add another params to query params
  queryParams.page = page;
  queryParams.limit = limit;

  // fetch products
  const productsQuery = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams),
    enabled: !!categoriesQuery.data,
    notifyOnChangeProps: ['data'],
  });

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
  const productsCount = productsCountQuery.data || 0;
  const totalPages = Math.ceil(productsCount / +limit);
  page = +page;
  if (categoriesQuery.isLoading) return <Loading />;
  return (
    <main className='my-2 gap-3 md:flex'>
      <Filter
        category={categoriesQuery.data!}
        onFilterChange={onFilterChange}
      />
      <div className='grow'>
        {(productsQuery.isLoading || productsCountQuery.isLoading) && (
          <Loading />
        )}
        {productsQuery.data && <Products products={productsQuery.data} />}
        {!!productsCountQuery.data && (
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
