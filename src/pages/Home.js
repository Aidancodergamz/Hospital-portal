import { useState } from "react";
import { FaUser, FaChild } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    if (type === "parents") {
      setModalContent({
        title: "Information for Parents",
        text: "As a parent, this App is designed to help your children during their stay in hospital. The App is both educational and entertaining and will give your child details on all the departments as well as some fun, age restricted games they can play. We aim to make your child's stay as easy as we can.",
      });
    } else if (type === "kids") {
      setModalContent({
        title: "Information for Kids",
        text: "Hi there! 👋 This portal helps you learn more about what you can expect during your stay here in hospital! You can check out our fun games and get information on all the different departments you might visit as well as get some information on your procedures and what to expect. Sometimes staying in hospital can feel scary but there's nothing to worry about and this App is here to hopefully make it a little less boring! 😄 Just click 'register' at the top to get started! Have fun!",
      });
    }
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-100 flex flex-col items-center text-center p-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-12 bg-white p-8 rounded-3xl shadow-xl max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-blue-600">🏥 Welcome to the KidsCare Portal! 🌈</h1>
        <p className="text-gray-600 mt-3">Helping reassure, educate and entertain children during their stay in hospital.</p>
      </motion.div>

      {/* More info buttons */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        <ActionButton icon={FaUser} label="For Parents" color="bg-yellow-400" onClick={() => openModal("parents")} />
        <ActionButton icon={FaChild} label="For Kids" color="bg-blue-400" onClick={() => openModal("kids")} />
      </div>

      {modalContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-bold text-blue-600">{modalContent.title}</h2>
            <p className="text-gray-600 mt-3">{modalContent.text}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, label, color, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg text-white font-bold ${color}`}
    >
      <Icon className="text-xl" />
      <span>{label}</span>
    </motion.button>
  );
}
