import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        // console.error(error.message);
        setError(error);
      }
    };

    getUser();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
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
      setError(error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        localStorage.setItem("token", token);
        setToken(token);
        return {
          user: responseData,
        };
      } else {
        throw new Error(responseData.message || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
      throw error;
    }
  };
  const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData.token;
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        throw new Error(responseData.message || "Admin Failed to login");
      }
    } catch (error) {
      console.error("Admin Login error:", error.message);
      setError(error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("non-auth-bookings");
    setUser(null);
    window.location.href = "/";
  };

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoggedIn,
        login,
        adminLogin,
        register,
        logoutUser,
        token,
      }}
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
