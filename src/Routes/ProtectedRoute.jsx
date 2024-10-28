import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import VerifyToken from "../utils/VerifyToken";

const ProtectedRoute = ({ element, role }) => {
  const user = VerifyToken();
  console.log(user?.role);

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  if (user.role === role) {
    return element;
  }

  if (user.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
