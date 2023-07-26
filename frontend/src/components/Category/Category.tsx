import useFetch from 'react-fetch-hook';
import Loading from '../UI/Loading';
import Filter from './Filter';
import Products from './Products';

interface IProps {
  categorySlug: string;
}

const Category = ({ categorySlug }: IProps) => {
  const { isLoading: categoryIsLoading, data: categoryData } = useFetch<
    Response<Category>
  >(`/api/v1/categories/slug/${categorySlug}`);
  const category = categoryData?.data.data;

  const { isLoading: productsIsLoading, data: productsData } = useFetch<
    Response<Product[]>
  >(`/api/v1/products?category=${category?._id}`, {
    depends: [category?._id],
  });
  const products = productsData?.data.data;

  if (categoryIsLoading) return <Loading />;
  return (
    <main class='my-2 flex gap-3'>
      <Filter category={category!} />
      {productsIsLoading && <Loading />}
      {products && <Products products={products} />}
    </main>
  );
};

export default Category;
