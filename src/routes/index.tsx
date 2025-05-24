import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SerieDetail from '../pages/SerieDetail';
import Categories from '../pages/Categories';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import UpdatePassword from '../pages/UpdatePassword';
import PrivateRoute from '../components/PrivateRoute';
import EditUser from '../pages/EditUser';
import ConfirmEmail from '../pages/ConfirmEmail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/detail/:id" element={<PrivateRoute element={<SerieDetail />} />} />
      <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
      <Route path="/edit-user" element={<PrivateRoute element={<EditUser />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<UpdatePassword />} />
      <Route path="/favorites" element={<PrivateRoute element={<Favorites />} />} />
    </>,
  ),
);
export default router;
