import './App.css'
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Notification from './Notification/Notification';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../redux/adverts/selectors';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const AdvertsPage = lazy(() => import('../pages/AdvertsPage/AdvertsPage'));


const App = () => {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <Notification text = {"Loading page..."}/>
  ) : (
    <Layout>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/catalog" element={<AdvertsPage />}/>
      </Routes>
    </Layout>
  )
}
export default App;
