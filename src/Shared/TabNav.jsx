import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';

const TabNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const tabs = [
        { id: 'schedule', label: '+ SCHEDULE A TASK', path: '/' },
        { id: 'tasks', label: 'SCHEDULED TASKS', path: '/ScheduleATask' },
        { id: 'tutorials', label: 'TUTORIALS', path: '/tutorials' }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="max-w-7xl mx-auto px-4 py-2 mt-4 md:mt-16">
            <div className="sm:hidden flex justify-end mb-4">
                <button
                    onClick={toggleMenu}
                    className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                >
                    {isMenuOpen ? <IoClose size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {tabs.map((tab, index) => (
                        <React.Fragment key={tab.id}>
                            <NavLink
                                to={tab.path}
                                className={({ isActive }) => `
                                    w-full sm:w-auto text-xs sm:text-sm text-center
                                    px-2 sm:px-4 py-2 uppercase font-semibold rounded-md transition-colors duration-200
                                    ${isActive
                                        ? 'text-white bg-orange-500'
                                        : ' hover:text-gray-400'
                                    }
                                `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {tab.label}
                            </NavLink>
                            {index < tabs.length - 1 && (
                                <div className="hidden sm:block w-12 h-[2px] bg-gray-400"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default TabNav;