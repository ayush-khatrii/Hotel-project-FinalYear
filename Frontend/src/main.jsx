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
import Bookings from "./page/ConfirmBooking.jsx";
import SingleRoom from "./page/SingleRoom.jsx";
import Profile from "./page/Profile.jsx";
import ConfirmBooking from "./page/ConfirmBooking.jsx";
import CancelCheckout from "./page/CancelCheckout.jsx";
import SuccessCheckout from "./page/SuccessCheckout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
