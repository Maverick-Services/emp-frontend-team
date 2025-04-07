import { FiGrid, FiUserPlus } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { IoHome } from 'react-icons/io5';
import { HiHandRaised } from "react-icons/hi2";

export const sideBarLinks = [
    {
        name: "Team Details",
        path: "/dashboard/profile",
        icon: IoHome
    },
    {
        name: "Members",
        path: "/dashboard/members",
        icon: FaUser
    },
    {
        name: "Create Task",
        path: "/dashboard/create-task",
        icon: FiUserPlus
    },
    {
        name: "Tasks",
        path: "/dashboard/tasks",
        icon: FiGrid
    },
    {
        name: "Queries",
        path: "/dashboard/queries",
        icon: HiHandRaised
    },
]