import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.any,
};

export default ProtectedRoute;
