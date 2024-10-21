import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login page
  return isAuthenticated ? element : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  element: PropTypes.any,
};
export default ProtectedRoute;
