import React, { useState } from 'react';
import { FaUsers, FaTools, FaBook, FaTasks } from 'react-icons/fa';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Students');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSidebarOpen(false); 
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative lg:w-64 w-64 bg-gray-400 p-5 text-white z-50`}>
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleTabChange('Students')}
            className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Students' ? 'bg-red-500' : 'hover:bg-blue-700'}`}
          >
            <FaUsers /><span>Students</span>
          </button>
          <button
            onClick={() => handleTabChange('Machines')}
            className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Machines' ? 'bg-red-500' : 'hover:bg-blue-700'}`}
          >
            <FaTools /><span>Machines</span>
          </button>
          <button
            onClick={() => handleTabChange('Courses')}
            className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Courses' ? 'bg-red-500' : 'hover:bg-blue-700'}`}
          >
            <FaBook /><span>Courses</span>
          </button>
          <button
            onClick={() => handleTabChange('Task List')}
            className={`flex items-center space-x-2 p-2 rounded ${selectedTab === 'Task List' ? 'bg-red-500' : 'hover:bg-blue-700'}`}
          >
            <FaTasks /><span>Task List</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-blue-900">
            {isSidebarOpen ? 'Close' : 'Open'} Menu
          </button>
          <h2 className="text-xl font-bold bg-red-200">{selectedTab}</h2>
        </header>

        <main className="p-5">
          {selectedTab === 'Students' && "<Students />"}
          {selectedTab === 'Machines' && "<Machines />"}
          {selectedTab === 'Courses' && "<Courses />"}
          {selectedTab === 'Task List' && "<TaskList />"}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
