import React, { useState } from 'react';
import LoggedInNav from '../includes/LoggedInNav';

// Updated sample data for the new departments, now including images
const departments = {
  "X-Ray": [
    { 
      title: "Getting X-Rays", 
      content: "You may need to stay still for a few moments while we take pictures of the inside of your body, it's a special camera and you won't feel a thing!", 
      image: "/assets/images/xray.jpg"  // Replace with the actual image URL
    },
    { 
      title: "The Technologist", 
      content: "The technologist will guide you through the process to make sure you're safe and comfortable.", 
      image: "/assets/images/tech.jpg"  // Replace with the actual image URL
    }
  ],
  "MRI": [
    { 
      title: "Before the MRI", 
      content: "You will be asked to lie down in the MRI machine. It may sound loud, but it won't hurt.", 
      image: "/assets/images/mri_before.jpg"  // Replace with the actual image URL
    },
    { 
      title: "During the MRI", 
      content: "You need to stay very still while the machine takes pictures of your body. It’s okay to take a break if you feel nervous.", 
      image: "/assets/images/mri_during.jpg"  // Replace with the actual image URL
    }
  ],
  "Clinics": [
    { 
      title: "Meeting the Doctor", 
      content: "The doctor will talk to you and your parents about how you're feeling and what’s going on.", 
      image: "/assets/images/doctor_kid_talking.jpg"  // Replace with the actual image URL
    },
    { 
      title: "Getting a Prescription", 
      content: "If you need medicine, the doctor will write a prescription for you.", 
      image: "/assets/images/doc_writting.jpg"  // Replace with the actual image URL
    }
  ],
  "Wards": [
    { 
      title: "Your Bed", 
      content: "You will have a comfortable bed to rest in. There may be a TV or a toy to keep you entertained.", 
      image: "/assets/images/ward1.jpg"  // Replace with the actual image URL
    },
    { 
      title: "Visiting Hours", 
      content: "Your family can visit during special hours to keep you company.", 
      image: "/assets/images/ward2.jpg"  // Replace with the actual image URL
    }
  ],
  "Play Areas": [
    { 
      title: "Fun and Games", 
      content: "The play area has toys, games, and books to keep you entertained while you rest.", 
      image: "/assets/images/play1.jpg"  // Replace with the actual image URL
    },
    { 
      title: "Meeting New Friends", 
      content: "You may meet other children who are also staying in the hospital. You can play together!", 
      image: "/assets/images/play2.jpg"  // Replace with the actual image URL
    }
  ],
  "Surgical Theatres": [
    { 
      title: "Before Surgery", 
      content: "You’ll meet the nice surgeon who will explain what will happen during the procedure.", 
      image: "/assets/images/surgeon1.jpg"  // Replace with the actual image URL
    },
    { 
      title: "After Surgery", 
      content: "You will rest in a recovery room. A nurse will take care of you and make sure you're feeling okay.", 
      image: "/assets/images/surgeon2.jpg"  // Replace with the actual image URL
    }
  ],
  "Children's Wing": [
    { 
      title: "Your Room", 
      content: "This is the part of the hospital where you will be staying, it will have many other children just like you.", 
      image: "/assets/images/kidsward1.jpg"  // Replace with the actual image URL
    },
    { 
      title: "Nurses and Doctors", 
      content: "Friendly nurses and doctors will take care of you. Don’t be afraid to ask them any questions!", 
      image: "/assets/images/doctors.jpg"  // Replace with the actual image URL
    }
  ]
};

function Department() {
  const [selectedDepartment, setSelectedDepartment] = useState("X-Ray");
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setCurrentFlashcard(0);  // Reset the flashcard when the department changes
  };

  const handleNextFlashcard = () => {
    if (currentFlashcard < departments[selectedDepartment].length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
    }
  };

  const handlePreviousFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <LoggedInNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Welcome to the Hospital Departments page!</h1>

        {/* Introduction */}
        <p className="text-lg text-gray-700 text-center mb-6">
          This page will help you learn more about what to expect during your stay in the hospital. Choose a department from the dropdown below to see helpful flashcards with information on what you will experience, meet, and how things will go. This is to help you feel more comfortable and prepared for your time in the hospital.
        </p>

        {/* Department Selection Dropdown */}
        <div className="my-4 text-center">
          <label htmlFor="department" className="block text-gray-700">Select Department:</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
            <option value="Clinics">Clinics</option>
            <option value="Wards">Wards</option>
            <option value="Play Areas">Play Areas</option>
            <option value="Surgical Theatres">Surgical Theatres</option>
            <option value="Children's Wing">Children's Wing</option>
          </select>
        </div>

        {/* Flashcard Display */}
        <div className="flex justify-center mt-6">
  <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 flex flex-col">
    <h2 className="text-xl font-semibold text-center text-gray-800">{departments[selectedDepartment][currentFlashcard].title}</h2>
    <img 
      src={departments[selectedDepartment][currentFlashcard].image} 
      alt={departments[selectedDepartment][currentFlashcard].title} 
      className="my-4 w-full h-auto object-cover rounded-lg"
    />
    <p className="mt-2 text-gray-600 text-center">{departments[selectedDepartment][currentFlashcard].content}</p>

    <div className="mt-4 flex justify-between">
      <button
        onClick={handlePreviousFlashcard}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={currentFlashcard === 0}
      >
        Previous
      </button>
      <button
        onClick={handleNextFlashcard}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={currentFlashcard === departments[selectedDepartment].length - 1}
      >
        Next
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default Department;
