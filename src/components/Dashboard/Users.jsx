import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import baseUrl from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import VerifyToken from "../../utils/VerifyToken";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import AuthToken from "../../utils/AuthToken";

const Users = () => {
  const user = VerifyToken();
  const token = AuthToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(null);

  const handleClickOpen = (username) => {
    setOpen(true);
    setUsername(username);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    isLoading,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl.users}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
  });

  const filteredUsers = data.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveUser = async (username) => {
    try {
      await axios.delete(`${baseUrl.users}/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      handleClose();
      refetch();
      if (username === user.username) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      toast.success("User deleted successfully");
    } catch (error) {
      console.log("Error in deleting user", error);
    }
  };

  const handleMakeAdmin = async (username) => {
    if (username !== user.username) {
      try {
        await axios.put(
          `${baseUrl.users}/${username}`,
          { role: "admin" },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token
            },
          }
        );
        refetch();
        toast.success("Success");
      } catch (error) {
        console.log("Error in making admin", error);
      }
    } else {
      toast.error("You can't make any update to your own account");
    }
  };
  const handleRemoveAdmin = async (username) => {
    try {
      await axios.put(
        `${baseUrl.users}/${username}`,
        { role: "student" },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        }
      );
      refetch();
      toast.success("Success");
    } catch (error) {
      console.log("Error in making admin", error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Users..."
            className="md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        </div>
      </div>

      <div className="mt-10 overflow-auto max-w-sm md:max-w-full max-h-[80vh]">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                CreatedAt
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className={`${
                    u?.username === user?.username && "bg-zinc-200"
                  }`}
                >
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {u?.username}{" "}
                    <p className="inline text-orange-500 ml-3 font-bold">
                      {u?.username === user.username && "(you)"}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {u?.role}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {moment(u?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-3xl text-white">
                    <div className="flex items-center gap-6 h-8">
                      {u?.username === user.username && u?.role === "admin" && (
                        <button
                          onClick={() => handleClickOpen(u?.username)}
                          className="flex items-center justify-center h-full text-red-400 border border-red-400 font-semibold hover:bg-red-200 duration-300 ease-out rounded px-1 text-[10px] text-nowrap"
                        >
                          Remove Your Account
                        </button>
                      )}
                      {user?.role === "super admin" &&
                        (u?.role === "student" || u?.role === "admin") && (
                          <button
                            onClick={() => handleClickOpen(u?.username)}
                            className="flex items-center justify-center h-full text-red-500 border border-red-500 hover:bg-red-200 duration-300 ease-out rounded p-1"
                          >
                            <MdDelete style={{ padding: "5px" }} />
                          </button>
                        )}
                      {u?.role === "student" &&
                        user?.role === "super admin" && (
                          <button
                            onClick={() => handleMakeAdmin(u?.username)}
                            className="flex items-center justify-center h-full text-green-500 border border-green-500 font-semibold hover:bg-green-200 duration-300 ease-out rounded px-1 text-[10px] text-nowrap"
                          >
                            Make Admin
                          </button>
                        )}
                      {u?.role === "admin" && user?.role === "super admin" && (
                        <button
                          onClick={() => handleRemoveAdmin(u?.username)}
                          className="flex items-center justify-center h-full text-orange-500 border border-orange-500 font-semibold hover:bg-orange-200 duration-300 ease-out rounded px-1 text-[10px] text-nowrap"
                        >
                          Remove Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-2 px-4 h-[600px] text-center align-middle text-gray-700"
                >
                  {isLoading ? <CircularProgress /> : "No users found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete this role??"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveUser(username)}
            color="error"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
