// src/pages/SplashScreen.js
import React from "react";
import { Spin } from "antd";
import { motion } from "framer-motion"; // for smooth animation
import { logo } from "../LOCAL/VARIABLE";

const SplashScreen = () => {
  return (
<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-white to-red-600 text-white">

      {/* Logo Animation */}
  <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="mb-6"
>
  <img
    src={logo} // public folder या src/assets से import karo
    alt="Vahan Solution Logo"
    className="w-44 h-44 rounded-full    " // gol + proper size
  />
</motion.div>


      {/* Spinner */}
      <Spin size="large" className="mb-4" />

      {/* Text Animation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg font-medium tracking-wide"
      >
        Loading App...
      </motion.p>
    </div>
  );
};

export default SplashScreen;
