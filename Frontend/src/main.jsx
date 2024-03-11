import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Layout from "./Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/ErrorPage.jsx";
import Rooms from "./page/Rooms.jsx";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import SingleRoom from "./page/SingleRoom.jsx";
import Profile from "./page/Profile.jsx";
import ConfirmBooking from "./page/ConfirmBooking.jsx";
import CancelCheckout from "./page/CancelCheckout.jsx";
import SuccessCheckout from "./page/SuccessCheckout.jsx";
import Admin from "./admin/Admin.jsx";
import Users from "./admin/admin-components/Users.jsx";
import Bookings from "./admin/admin-components/Bookings.jsx";
import HotelRooms from "./admin/admin-components/HotelRooms.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./admin/admin-components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/:id/confirm-booking/",
        element: <ConfirmBooking />,
      },
      {
        path: "/rooms/:id",
        element: <SingleRoom />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/checkout-cancel",
        element: <CancelCheckout />,
      },
      {
        path: "/checkout-success",
        element: <SuccessCheckout />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/home",
        element: <Home />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/bookings",
        element: <Bookings />,
      },
      {
        path: "/admin/hotelrooms",
        element: <HotelRooms />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
