// import { useEffect, useState } from 'preact/hooks';
import useFetch from 'react-fetch-hook';
import Map from './Map';
import NavMenu from './NavMenu';
import Novelty from './Novelty';
import Loading from '../UI/Loading';

const Home = () => {
  const { isLoading: categoriesLoading, data: categoriesResponse } =
    useFetch<any>('/api/v1/categories?sort=menuType,name');
  const categoriesData: Category[] = categoriesResponse?.data.data;

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
