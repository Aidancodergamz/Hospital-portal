import { useState } from "react";
import { FaUserMd, FaUser, FaChild, FaHospital } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-100 flex flex-col items-center text-center p-6">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-12 bg-white p-8 rounded-3xl shadow-xl max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-blue-600">Welcome to the KidsCare Portal! 🌈</h1>
        <p className="text-gray-600 mt-3">Helping children, parents, and doctors stay connected.</p>
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        <ActionButton icon={FaUser} label="For Parents" color="bg-yellow-400" />
        <ActionButton icon={FaChild} label="For Kids" color="bg-blue-400" />
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg text-white font-bold ${color}`}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </motion.button>
  );
}
