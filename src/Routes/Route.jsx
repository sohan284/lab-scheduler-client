import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import RegisterPage from "../Pages/auth/registerPage";
import LoginPage from "../Pages/auth/LoginPage";
import ScheduleATask from "../Pages/SCHEDULETask/ScheduleATask";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/ScheduleATask',
                element: <ScheduleATask />
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
