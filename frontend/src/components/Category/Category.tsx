import useFetch from 'react-fetch-hook';
import Loading from '../UI/Loading';
import Filter from './Filter';

interface IProps {
  categorySlug: string;
}

const Category = ({ categorySlug }: IProps) => {
  const { isLoading, data, error } = useFetch<any>(
    `/api/v1/categories/slug/${categorySlug}`
  );
  const category: Category = data?.data.data;

  if (isLoading) return <Loading />;
  return (
    <main class='flex gap-3'>
      <Filter category={category} />
      <section>Products</section>
    </main>
  );
};

export default Category;
