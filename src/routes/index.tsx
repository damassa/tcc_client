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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/detail/:id" element={<PrivateRoute element={<SerieDetail />} />} />
      <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/favorites" element={<PrivateRoute element={<Favorites />} />} />
    </>,
  ),
);
export default router;
// const RoutesSite: React.FC = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/detail" element={<SerieDetail />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route path="/updatePassword" element={<UpdatePassword />} />
//         <Route path="/favorites" element={<Favorites />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default RoutesSite;
