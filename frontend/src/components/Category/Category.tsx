import useFetch from 'react-fetch-hook';
import Loading from '../UI/Loading';
import Filter from './Filter';
import Products from './Products';
import { useState } from 'preact/hooks';
import { useAppSelector } from '../../store';

interface Props {
  categorySlug: string;
}

interface Filter {
  name: string;
  parameter: string;
}

const Category = ({ categorySlug }: Props) => {
  const [filter, setFilter] = useState<Filter[]>([]);

  const arrayFilters = filter.reduce((acc, el) => {
    const { name, parameter } = el;
    const index = acc.findIndex(el => el[0].name === name);
    if (index === -1) acc.push([{ name, parameter }]);
    else acc[index].push({ name, parameter });
    return acc;
  }, [] as Filter[][]);

  const filterJson = JSON.stringify(arrayFilters);

  const { isLoading: categoriesIsLoading, categories } = useAppSelector(
    state => state.category
  );
  const category = categories.find(category => category.slug === categorySlug);

  let queryParams = new URLSearchParams([]);
  if (filter.length > 0) queryParams.append('characteristics', filterJson);
  if (category?._id) queryParams.append('category', category._id);
  const { isLoading: productsIsLoading, data: productsData } = useFetch<
    Response<Product[]>
  >(`/api/v1/products?${queryParams}`, {
    depends: [category?._id],
  });
  const products = productsData?.data.data;

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

  if (categoriesIsLoading) return <Loading />;
  return (
    <main class='my-2 gap-3 md:flex'>
      <Filter category={category!} onFilterChange={onFilterChange} />
      {productsIsLoading && <Loading />}
      {products && <Products products={products} />}
    </main>
  );
};

export default Category;
