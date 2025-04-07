import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTeamTasks } from "../../../services/operations/taskAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { Spinner } from "../../common/Spinner";
import { formattedFullDate } from "../../../utils/dateFormatter";
import { STATUS } from "../../../utils/constants";
import LayoutProvider from "../../common/LayoutProvider";

const MyTasks = () => {
  const { token, loading, setLoading } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setLoading(true);
    const result = await fetchTeamTasks(token);
    if (result) {
      setTasks(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <Spinner />;

  return (
    <LayoutProvider heading={"Team Tasks"}>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {tasks && tasks.length === 0 ? (
          <p className="text-center text-xl text-gray-600 col-span-full">
            No Tasks assigned to you yet
          </p>
        ) : (
          tasks.map((ts, index) => (
            <motion.div
              key={ts?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              }}
              className="w-full max-w-[350px] flex-1 flex justify-center"
            >
              <Link to={`/dashboard/tasks/${ts?._id}`} className="w-full">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer flex flex-col gap-2 items-start min-h-[220px] h-auto">
                  <h3 className="text-xl font-semibold text-gray-800 break-words whitespace-normal">
                    Task Name: {ts?.name}
                  </h3>
                  <p className="text-gray-700">
                    <span className="font-medium">Steps:</span> {ts?.steps?.length}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Created At:</span>{" "}
                    {formattedFullDate(ts?.createdAt)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Deadline:</span>{" "}
                    {formattedFullDate(ts?.deadline)}
                  </p>
                  <span
                    className={`p-[0.2rem] px-[0.5rem] rounded-full text-sm font-medium text-white ${ts?.status === STATUS.COMPLETED ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {ts?.status}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </LayoutProvider>
  );
};

export default MyTasks;
