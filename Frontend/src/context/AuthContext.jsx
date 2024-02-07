import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [error, setError] = useState(null);
	const [user, setUser] = useState("");
	const [token, setToken] = useState(localStorage.getItem("token"));

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetch("http://localhost:3000/auth/user", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error(error.message);
				throw error;
			}
		};

		getUser();
	}, []);

	const register = async (username, email, password) => {
		try {
			const response = await fetch("http://localhost:3000/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (response.ok) {
				const res_data = await response.json();
				setUser(res_data);
			}
		} catch (error) {
			console.error("Registration error:", error.message);
			throw error;
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			if (response.ok) {
				const res_data = await response.json();
				setToken((prevToken) => {
					localStorage.setItem("token", res_data.token);
					return res_data.token;
				});
			}

			if (!response.ok) {
				alert("Something went wrong !!");
			}
		} catch (error) {
			console.error("Login error:", error.message);
			throw error;
		}
	};

	const logoutUser = () => {
		setToken("");
		localStorage.removeItem("token");
		setUser(null);
		window.location.href = "/";
	};

	let isLoggedIn = !!token;

	return (
		<AuthContext.Provider
			value={{ user, error, isLoggedIn, login, register, logoutUser, token }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth used  outside of the Provider");
	}
	return context;
};

export default AuthContext;
