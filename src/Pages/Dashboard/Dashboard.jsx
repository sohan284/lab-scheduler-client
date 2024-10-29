import React, { useState } from 'react';
import { FaUsers, FaTools, FaBook, FaTasks } from 'react-icons/fa';
import { IoClose, IoLogoCss3, IoLogOut, IoMenu, IoSettings } from 'react-icons/io5';
import Machines from '../../components/Dashboard/Machines';
import Courses from '../../components/Dashboard/Courses';
import TaskList from '../../components/Dashboard/TaskList';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import Users from '../../components/Dashboard/Users';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('Users');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSidebarOpen(false);
    };
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative lg:w-64 w-64 bg-zinc-200 p-5 p-text z-50`}>
                <h1 className="text-2xl font-bold mb-5">Admin</h1>
                <nav className="flex flex-col gap-4 ">
                    <button
                        onClick={() => handleTabChange('Users')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Users' ? 'p-bg  text-white font-bold' : 'hover:bg-zinc-300 p-text'}`}
                    >
                        <FaUsers /><span>Users</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Machines')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Machines' ? 'p-bg  text-white font-bold' : 'hover:bg-zinc-300 p-text'}`}
                    >
                        <FaTools /><span>Machines</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Courses')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Courses' ? 'p-bg  text-white font-bold' : 'hover:bg-zinc-300 p-text'}`}
                    >
                        <FaBook /><span>Courses</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Task List')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Task List' ? 'p-bg  text-white font-bold' : 'hover:bg-zinc-300 p-text'}`}
                    >
                        <FaTasks /><span>Task List</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Settings')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Settings' ? 'p-bg  text-white font-bold' : 'hover:bg-zinc-300 p-text'}`}
                    >
                        <IoSettings /><span>Settings</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between bg-zinc-50 p-4 shadow-md">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-2xl text-orange-500">
                        {isSidebarOpen ? <IoClose /> : <IoMenu />}
                    </button>
                    <h2 className="text-xl p-text font-bold">{selectedTab}</h2>
                    <button onClick={handleLogout} className='border border-purple-500 p-2 text-xl rounded-md text-purple-400 hover:text-purple-700 hover:bg-purple-200 duration-300 active:scale-95'>
                        <VscSignOut className='' />
                    </button>
                </header>

                <main className="p-5">
                    {selectedTab === 'Users' && <Users />}
                    {selectedTab === 'Machines' && <Machines />}
                    {selectedTab === 'Courses' && <Courses />}
                    {selectedTab === 'Task List' && <TaskList />}
                    {selectedTab === 'Settings' && "TaskList" }
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
