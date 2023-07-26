import useFetch from 'react-fetch-hook';
import Map from './Map';
import NavMenu from './NavMenu';
import Novelty from './Novelty';
import Loading from '../UI/Loading';

const Home = () => {
  const { isLoading: categoriesLoading, data: categoriesResponse } = useFetch<
    Response<Category[]>
  >('/api/v1/categories?sort=menuType,name');
  const categoriesData = categoriesResponse?.data.data;

  return (
    <main>
      {categoriesLoading && <Loading />}
      {categoriesData && <NavMenu categories={categoriesData} />}
      <Novelty />
      <Map />
    </main>
  );
};

export default Home;
