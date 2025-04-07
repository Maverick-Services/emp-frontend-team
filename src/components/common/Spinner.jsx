import React from "react";
import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 3D Rotating Ring Effect */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Ring - Blue (Dotted, Slow Rotation, Subtle Pulsing) */}
          <motion.div
            className="absolute w-20 h-20 border-[8px] border-dotted border-[#1C398E] rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1], // Subtle pulsing
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          ></motion.div>

          {/* Middle Ring - Green (More Space, Slow Rotation) */}
          <motion.div
            className="absolute w-14 h-14 border-[6px] border-transparent border-b-[#00A86B] rounded-full"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          ></motion.div>

          {/* Inner Ring - Pure Red (More Space, Slow Rotation) */}
          <motion.div
            className="absolute w-9 h-9 border-[6px] border-transparent border-t-[#FF0000] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          ></motion.div>
        </div>

        {/* Solid Blue Loading Text */}
        <motion.p
          className="text-lg font-semibold text-[#1C398E]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};
