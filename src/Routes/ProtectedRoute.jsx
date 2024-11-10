import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import VerifyToken from "../utils/VerifyToken";

const ProtectedRoute = ({ element, roles }) => {
  const user = VerifyToken();

  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  
  if (roles.includes(user.role)) {
    return element;
  }


  if (user.role === "admin" || user.role === "super admin") {
    return <Navigate to="/dashboard" />;
  }


  return <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,  
};

export default ProtectedRoute;
