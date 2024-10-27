import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Layout = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
