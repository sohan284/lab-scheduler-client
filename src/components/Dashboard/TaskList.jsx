import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import moment from 'moment';
import { MdDelete } from "react-icons/md";
import baseUrl from "../../api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AuthToken from "../../utils/AuthToken";

const TaskList = () => {
  const token = AuthToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
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
      const response = await axios.get(`${baseUrl.scheduledtasks}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the bearer token here
        }
      });
      return response.data.data;
    },
  });

  const filteredUsers = data?.filter((task) =>
    task.taskName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveUser = async (id) => {
    try {
      await axios.delete(`${baseUrl.task}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the bearer token here
        }
      });
      handleClose();
      refetch();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log("Error in deleting task", error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        </div>
      </div>

      <div className="mt-10 overflow-auto max-w-sm md:max-w-full max-h-[80vh] custom-scroll">
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
                Scheduled date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Created At
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((task) => (
                <tr key={task._id}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {task?.taskName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {task?.createdBy}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {moment(task?.startDate).format("DD/MM/YYYY")}
                  </td>
                  <td className=" border-b border-gray-300 text-center text-sm text-gray-800">
                    <p
                      className={`text-nowrap w-[100px] px-2 p-0.5 ${
                        task?.approve === "Pending" && "bg-orange-500 text-white rounded-xl"
                      } ${
                        task?.approve === "Approved" && "bg-green-600 text-white rounded-xl"
                      } ${
                        task?.approve === "Rejected" && "bg-red-700 text-white rounded-xl"
                      } ${
                        task?.approve === "Completed" && "bg-blue-500 text-white rounded-xl"
                      }`}
                    >
                      {task?.approve}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {moment(task?.createdAt).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="border-b border-gray-300 text-3xl text-gray-800">
                    <div className="flex justify-center">
                      <MdDelete onClick={() => handleClickOpen(task?._id)} className='text-red-500 border border-red-500 hover:bg-red-200 duration-300 m-2 p-1 ease-out rounded' />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 h-[600px] text-center align-middle text-gray-700">
                  {isLoading ? <CircularProgress /> : "No tasks found"}
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
          {"Confirm Task Deletion"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveUser(id)}
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
