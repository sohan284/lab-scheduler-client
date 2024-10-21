import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className=" flex justify-between items-center mt-5 md:mt-10 px-4 xl:px-0 ">
      <div>
        <Link to="/">
          <img src={logo} alt="" className="w-32 md:w-[180px]" />
        </Link>
      </div>
      {user ? (
        <div className="flex gap-5 items-center">
          <button
            onClick={handleLogout}
            className="uppercase font-semibold flex items-center gap-3 border border-white hover:bg-zinc-50 p-2 hover:border hover:border-zinc-100 duration-500 ease-in-out rounded"
          >
            Logout <PiSignOutBold className="text-xl" />
          </button>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Link to="/login" className="uppercase font-semibold">
            login
          </Link>
          <span className="text-xl font-thin mb-1.5">|</span>
          <Link to="/register" className="uppercase font-semibold">
            register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
