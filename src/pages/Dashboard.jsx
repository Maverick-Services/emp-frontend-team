import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/core/dashboard/Sidebar';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { IoClose } from 'react-icons/io5';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

    // <div className='w-full h-full'>
    //   <Navbar/>
    //   <div className="relative flex items-start w-full h-full overflow-hidden bg-gray-200">
    //     {/* Sidebar - Responsive */}
    //     <div
    //       className={`absolute md:relative z-50 transition-all duration-300 h-full ${
    //         isSidebarOpen ? "w-[250px] h-fit" : "max-md:w-[70px] w-[250px] max-md:h-0 max-md:overflow-hidden"
    //       } bg-blue-900 text-white shadow-lg flex flex-col`}
    //     >
    //       <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    //     </div>
    //     {/* Mobile Menu Button */}

    //     {
    //       !isSidebarOpen &&
    //       <button
    //         className="absolute top-1 left-[5%] md:hidden z-50 bg-blue-900 p-2 rounded-md shadow-md"
    //         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    //       >
    //         <FiMenu size={24} className="text-white" />
    //       </button>
    //     }

    //     {/* Main Content */}
    //     <div className="flex-grow overflow-x-hidden overflow-y-auto flex justify-center items-start pb-20  w-full h-full">
    //       <div className="w-11/12 py-14 sm:py-8 bg-gray-200 rounded-lg">
    //         <Outlet />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full max-[768px]:flex-col flex bg-[#F3F6FE] h-screen">
      <div className="flex w-full justify-between items-center p-5 bg-white shadow-md md:hidden">
        <img src="/logo.png" alt="logo" className="h-7" />
        <div onClick={() => setIsSidebarOpen(prev => !prev)} className="cursor-pointer">
          {isSidebarOpen
            ? <IoClose className="text-2xl ease-in-out transition-all duration-300 focus:rotate-90" />
            : <FiMenu className="text-2xl" />
          }
        </div>
      </div>
      <div>
        <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <div onClick={() => setIsSidebarOpen(false)} className="flex-1 w-full h-screen overflow-y-auto bg-[#F3F6FE]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
