import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Layout = () => {
  const location = useLocation();
  const hide = location.pathname === '/dashboard';
  return (
    <div className="max-w-[1280px] mx-auto">
      {!hide && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
