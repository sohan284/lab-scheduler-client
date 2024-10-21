import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token"); // or however you store your token

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true); // Set authentication state to true
        setUserName(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false); // Set authentication state to false if token is invalid
      }
    } else {
      setIsAuthenticated(false); // No token found, user is not authenticated
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
