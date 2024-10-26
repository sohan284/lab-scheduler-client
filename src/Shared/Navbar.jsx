import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import VerifyToken from "../utils/VerifyToken";
import UserManagement from "../Services/User";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

const Navbar = () => {
  const user = VerifyToken();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  const handleRemoveAccount = async (username) => {
    await UserManagement.removeAccount(username).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    });
  };

  return (
    <nav className=" flex justify-between items-center mt-5 md:mt-5 px-4 xl:px-0 ">
      <div>
        <Link to="/">
          <img src={logo} alt="" className="w-32 md:w-[180px]" />
        </Link>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="" id="alert-dialog-description">
            <strong>Warning:</strong> Deleting your account will permanently
            remove it from the Lab Activity Scheduler, along with all your
            scheduled tasks. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveAccount(user?.username)}
            color="error"
            autoFocus
          >
            Delete My Account
          </Button>
        </DialogActions>
      </Dialog>

      {user?.username ? (
        <div className="flex gap-5 items-center">
          <button
            onClick={handleClickOpen}
            className="font-medium flex items-center gap-3 border border-white text-[#999999] hover:bg-zinc-50 p-2 hover:border hover:border-zinc-100 duration-500 ease-in-out rounded"
          >
            Remove Account
          </button>
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
