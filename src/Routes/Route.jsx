import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
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
            }
        ]
    },
]);