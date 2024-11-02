import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const VerifyToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }else{
    return <Navigate to="/login" />
  }
};

export default VerifyToken;
