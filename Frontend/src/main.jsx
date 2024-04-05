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
import UserReview from "./admin/admin-components/UserReviews.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./admin/admin-components/Home.jsx";
import AdminList from "./admin/admin-components/AdminList.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AddRooms from "./admin/admin-components/AddRooms.jsx";
import AdminProfile from "./admin/admin-components/AdminProfile.jsx";
import UpdateUser from "./admin/admin-components/UpdateUser.jsx";
import ContactData from "./admin/admin-components/ContactData.jsx";
import UpdateRoom from "./admin/admin-components/UpdateRoom.jsx";

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
        path: "/admin-login",
        element: <AdminLogin />,
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
        path: "/admin/admins",
        element: <AdminList />,
      },
      {
        path: "/admin/bookings",
        element: <Bookings />,
      },
      {
        path: "/admin/hotelrooms",
        element: <HotelRooms />,
      },
      {
        path: "/admin/post-rooms",
        element: <AddRooms />,
      },
      {
        path: "/admin/reviews",
        element: <UserReview />,
      },
      {
        path: "/admin/profile",
        element: <AdminProfile />,
      },
      {
        path: "/admin/users/:id",
        element: <UpdateUser />,
      },
      {
        path: "/admin/contacts",
        element: <ContactData />,
      },
      {
        path: "/admin/room/:id",
        element: <UpdateRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
