import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tutorials from "../Pages/Tutorials/Tutorials";
import RegisterPage from "../Pages/auth/registerPage";
import LoginPage from "../Pages/auth/LoginPage";
import ScheduleATask from "../Pages/SCHEDULETask/ScheduleATask";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/tutorials",
        element: <ProtectedRoute element={<Tutorials />} />,
      },
      {
        path: "/ScheduleATask",
        element: <ProtectedRoute element={<ScheduleATask />} />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
