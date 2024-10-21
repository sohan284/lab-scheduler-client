import { jwtDecode } from "jwt-decode";

export const VerifyToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
};

export default VerifyToken;
