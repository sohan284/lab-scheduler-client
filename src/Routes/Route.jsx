import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tutorials from "../Pages/Tutorials/Tutorials";
import RegisterPage from "../Pages/auth/registerPage";
import LoginPage from "../Pages/auth/LoginPage";
import ScheduleATask from "../Pages/SCHEDULETask/ScheduleATask";
import ScheduledTask from "../Pages/ScheduledTask/ScheduledTask";

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
                path: '/tutorials',
                element: <Tutorials />
            },
            {
                path: '/ScheduleATask',
                element: <ScheduleATask />
            },
            {
                path: '/scheduleTask',
                element: <ScheduledTask />
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
