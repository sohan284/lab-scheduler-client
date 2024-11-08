import { useState, useEffect } from 'react';
import { FaUsers, FaTools, FaBook, FaTasks } from 'react-icons/fa';
import { IoClose, IoMenu, IoSettings } from 'react-icons/io5';
import Machines from '../../components/Dashboard/Machines';
import Courses from '../../components/Dashboard/Courses';
import TaskList from '../../components/Dashboard/TaskList';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import Users from '../../components/Dashboard/Users';
import { RiVideoFill } from "react-icons/ri";
import AddTutorial from '../../components/Dashboard/AddTutorial';

const Dashboard = () => {
    const navigate = useNavigate();

    // State for selected tab
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('tab') || 'Users');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem('tab', selectedTab);
    }, [selectedTab]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        setSidebarOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('tab')
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative lg:w-64 w-64 bg-zinc-200 p-5 z-50`}>
                <h1 className="text-2xl font-bold mb-5">Admin</h1>
                <nav className="flex flex-col gap-4">
                    <button
                        onClick={() => handleTabChange('Users')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Users' ? 'bg-orange-500 text-white font-bold' : 'hover:bg-zinc-300'}`}
                    >
                        <FaUsers /><span>Users</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Machines')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Machines' ? 'bg-orange-500 text-white font-bold' : 'hover:bg-zinc-300'}`}
                    >
                        <FaTools /><span>Machines</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Courses')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Courses' ? 'bg-orange-500 text-white font-bold' : 'hover:bg-zinc-300'}`}
                    >
                        <FaBook /><span>Courses</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('Task List')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Task List' ? 'bg-orange-500 text-white font-bold' : 'hover:bg-zinc-300'}`}
                    >
                        <FaTasks /><span>Task List</span>
                    </button>
                    {/* <button
                        onClick={() => handleTabChange('Tutorials')}
                        className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Tutorials' ? 'bg-orange-500 text-white font-bold' : 'hover:bg-zinc-300'}`}
                    >
                        <RiVideoFill /><span>Tutorials</span>
                    </button> */}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between bg-zinc-50 p-4 shadow-md">
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-2xl text-orange-500">
                        {isSidebarOpen ? <IoClose /> : <IoMenu />}
                    </button>
                    <h2 className="text-xl font-bold">{selectedTab}</h2>
                    <button onClick={handleLogout} className='border border-purple-500 p-2 text-xl rounded-md text-purple-400 hover:text-purple-700 hover:bg-purple-200 duration-300 active:scale-95'>
                        <VscSignOut />
                    </button>
                </header>

                <main className="p-5">
                    {selectedTab === 'Users' && <Users />}
                    {selectedTab === 'Machines' && <Machines />}
                    {selectedTab === 'Courses' && <Courses />}
                    {selectedTab === 'Task List' && <TaskList />}
                    {/* {selectedTab === 'Tutorials' && <AddTutorial />} */}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
