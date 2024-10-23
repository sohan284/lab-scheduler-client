import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import TabNav from '../Shared/TabNav';

const Layout = () => {
    return (
        <div className='max-w-[1280px] mx-auto'>
            <Navbar />
          
            <Outlet />
        </div>
    );
};

export default Layout;