import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddFood from './components/AddFood.jsx';
import UpdateFood from './components/UpdateFood.jsx';
import HomePage from './components/HomePage.jsx';
import AllFoods from './components/AllFoods.jsx';
import Gallery from './components/Gallery.jsx';
import MyFoods from './components/MyFoods.jsx';
import MyOrders from './components/MyOrders.jsx';
import Error from './components/Error.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import SingleFood from './components/SingleFood.jsx';
import FoodPurchase from './components/FoodPurchase.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/allEateries",
    element: <AllFoods></AllFoods>,
  },
  {
    path: "/food/:id",
    element: <SingleFood></SingleFood>,
  },
  {
    path: "/purchase/:id",
    element: (
      <PrivateRoute>
        <FoodPurchase></FoodPurchase>
      </PrivateRoute>
    ),
  },
  {
    path: "/galleries",
    element: <Gallery></Gallery>,
  },
  {
    path: "/addEateries",
    element: (
      <PrivateRoute>
        <AddFood></AddFood>
      </PrivateRoute>
    ),
  },
  {
    path: "/updateEateries/:id",
    element: <UpdateFood></UpdateFood>,
  },
  {
    path: "/myEateries",
    element: (
      <PrivateRoute>
        <MyFoods></MyFoods>
      </PrivateRoute>
    ),
  },
  {
    path: "/myOrder",
    element: (
      <PrivateRoute>
        <MyOrders></MyOrders>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Error></Error>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
