import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import VerifyToken from "../utils/VerifyToken";

const ProtectedRoute = ({ element }) => {
  const user = VerifyToken();
  return user?.username ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.any,
};

export default ProtectedRoute;
