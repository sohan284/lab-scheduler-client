import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tutorials from "../Pages/Tutorials/Tutorials";
import LoginPage from "../Pages/auth/LoginPage";
import ScheduleATask from "../Pages/SCHEDULETask/ScheduleATask";
import ProtectedRoute from "./ProtectedRoute";
import AddedTasks from "../Pages/AddedTasks/AddedTasks";
import ApproveStatusPage from "../Pages/ApproveStatusPage";
import RejectStatusPage from "../Pages/RejectStatusPage";
import RegisterPage from "../Pages/auth/RegisterPage";
import VideoUpload from "../components/VideoUpload/VideoUpload";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} roles={["student"]} />,
      },
      {
        path: "/tutorials",
        element: <ProtectedRoute element={<Tutorials />} roles={["student"]} />,
      },
      {
        path: "/tutorials/:machineName",
        element: <ProtectedRoute element={<Tutorials />} role="student" />,
      },
      {
        path: "/ScheduleATask",
        element: <ProtectedRoute element={<ScheduleATask />} roles={["student"]} />,
      },
      {
        path: "/addedTasks",
        element: <ProtectedRoute element={<AddedTasks />} roles={["student"]} />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/upload",
        element: <VideoUpload />,
      },
    ],
  },
  {
 
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} roles={["admin", "super admin"]} />,
  },
  {
    path: "/tasks/approve/:taskId",
    element: <ApproveStatusPage />,
  },
  {
    path: "/tasks/reject/:taskId",
    element: <RejectStatusPage />, 
  },
]);
