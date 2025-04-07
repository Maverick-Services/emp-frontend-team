import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchTeamMembers } from "../../../services/operations/teamAPI";
import { AuthContext } from "../../../Context/AuthContext";
import { Spinner } from "../../common/Spinner";
import LayoutProvider from "../../common/LayoutProvider";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Members = () => {
  const { token, loading, setLoading, team } = useContext(AuthContext);
  const [members, setMembers] = useState([]);

  const fetchMemebrs = async () => {
    setLoading(true);
    const result = await fetchTeamMembers(token, { teamId: team?._id });
    if (result) {
      setMembers(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemebrs();
  }, []);

  if (loading) return <Spinner />;

  return (
    <LayoutProvider heading={"Team Members"}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full"
      >
        {members && !members.length ? (
          <motion.p
            variants={cardVariants}
            className="text-gray-600 text-lg text-center col-span-full"
          >
            No Members added yet
          </motion.p>
        ) : (
          members?.map((ms) => (
            <motion.div
              key={ms?._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center"
            >
              <Link to={"#"} className="w-full max-w-[350px] flex-1">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 transition-all hover:shadow-xl min-h-[220px] h-auto">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Name: {ms?.name}
                  </h3>

                  {/* FIX: Ensure Email Wraps Properly */}
                  <p className="text-gray-600 break-words whitespace-normal">
                    Email: {ms?.email}
                  </p>

                  <p className="text-gray-600">Mobile No: {ms?.phoneNo}</p>
                  <p className="text-gray-600">
                    Tasks Assigned:{" "}
                    <span className="font-semibold text-[#1C398E]">
                      {ms?.tasks?.length}
                    </span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </LayoutProvider>
  );
};

export default Members;
