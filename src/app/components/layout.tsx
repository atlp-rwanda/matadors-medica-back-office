
"use client"
import React, { useEffect, useState } from 'react';
import { FaHome, FaCalendarAlt, FaFileAlt, FaUserEdit } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Image from 'next/image';
import Logo from '../assets/images/Logo.png';
import Profile from '../assets/images/Ellipse.png';
import Sidebar from './sidebar';
import Search from './search';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 lg:ml-72">
                <main className="p-5 pr-5 pl-5 pb-10 bg-[#EEF4FF] text-black">
                    {/* <Search data={data} onSearch={handleSearch} /> */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
