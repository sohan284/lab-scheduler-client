import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import VerifyToken from "../utils/VerifyToken";

const ProtectedRoute = ({ element, role }) => {
  const user = VerifyToken();

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin" && role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default ProtectedRoute;
