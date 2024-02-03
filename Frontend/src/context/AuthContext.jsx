import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
		}
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

			if (!response.ok) {
				const data = await response.json();
				setError(data.message);
				throw new Error(data.message);
			}
			const res_data = await response.json();
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

			if (!response.ok) {
				const data = await response.json();
				setError(data.message);
				throw new Error(data.message);
			}

			const res_data = await response.json();
			console.log("After login data", res_data);
			setToken(res_data.token);
			localStorage.setItem("token", JSON.stringify(res_data.token));
		} catch (error) {
			console.error("Login error:", error.message);
			throw error;
		}
	};

	const logoutUser = () => {
		setToken("");
		localStorage.removeItem("token");
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
