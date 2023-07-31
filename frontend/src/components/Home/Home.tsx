import Map from './Map';
import NavMenu from './NavMenu';
import Novelty from './Novelty';
import Loading from '../UI/Loading';
import { useAppSelector } from '../../store';

const Home = () => {
  const { isLoading, categories } = useAppSelector(state => state.category);

  return (
    <main>
      {isLoading && <Loading />}
      {!isLoading && <NavMenu categories={categories} />}
      <Novelty />
      <Map />
    </main>
  );
};

export default Home;
