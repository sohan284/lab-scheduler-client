import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  return token ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.any,
};

export default ProtectedRoute;
