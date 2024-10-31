import axios from "axios";
import React, { useState } from "react";
import {  FaSearch } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import baseUrl from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";
import VerifyToken from "../../utils/VerifyToken";
import toast, { Toaster } from "react-hot-toast";

const TaskList = () => {
  const user = VerifyToken();
  const [searchQuery, setSearchQuery] = useState("");

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
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
    isError,
    data = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl.scheduledtasks}`);
      return response.data.data;
    },
  });

  const filteredUsers = data?.filter((machine) =>
    machine.taskName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleRemoveUser = async (username) => {
    if (username !== user.username) {
      try {
        await axios.delete(`${baseUrl.users}/${username}`);
        handleClose();
        refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        console.log("Error in deleting machine", error);
      }
    } else {
      toast.error("You can delete your own account");
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
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Created By
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((machine) => (
                <tr key={machine._id}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {machine?.taskName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {machine?.createdBy}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {machine?.approve}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 h-[600px] text-center text-gray-700">
                  {isLoading ? <CircularProgress/> : "No tasks found"}
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
          {"Confirm Machine Deletion"}
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
