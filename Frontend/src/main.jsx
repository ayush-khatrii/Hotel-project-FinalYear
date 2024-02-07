import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Layout from "./layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./page/ErrorPage.jsx";
import Rooms from "./page/Rooms.jsx";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Bookings from "./page/Bookings.jsx";
import SingleRoom from "./page/SingleRoom.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProfileButton from "./components/Profile.jsx";

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
				path: "/bookings",
				element: <Bookings />,
			},
			{
				path: "/rooms/:id",
				element: <SingleRoom />,
			},
			{
				path: "/profile",
				element: <ProfileButton />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<RouterProvider router={router} />
	</AuthProvider>
);
