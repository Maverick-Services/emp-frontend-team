import React, { useContext } from 'react';
import { sideBarLinks } from '../../../data/sidebarLinks';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../../services/operations/authAPI';
import { AuthContext } from '../../../Context/AuthContext';

export const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  return (
    <div
      className={`transition-all ease-in-out duration-500 px-7 w-64 fixed md:relative top-0 z-50 ${!isOpen ? "-left-full" : "left-0"} md:left-0 py-3 md:w-64 lg:w-72 h-screen overflow-y-auto bg-white shadow-xl flex flex-col justify-between border-r border-gray-100`}
    >
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 mb-3">
          <img src="/logo.png" alt="logo" />
        </div>

        <div className="flex flex-col gap-4">
          {sideBarLinks.map((link, id) => (
            <NavLink
              key={id}
              to={link?.path || "#"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-1 transition-all duration-200 font-semibold text-lg ${isActive
                  ? 'border-r-4 border-blue-800 text-black font-bold'
                  : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    className={`text-xl ml-2" ${isActive ? 'text-blue-800' : ''}`}
                  />
                  <span className={``}>
                    {link?.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div
        onClick={() => logout(navigate, setUser, setToken)}
        className="flex gap-3 items-center py-3 px-4 font-semibold text-lg cursor-pointer rounded-lg hover:bg-gray-300 transition-all ease-in-out duration-300 bg-gray-100">
        <FiLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};
