import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNav from "../includes/LoggedInNav";

function UserDash() {
  const [message, setMessage] = useState("Loading...");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/userdash", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/login");
        } else {
          setUserData(data);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <LoggedInNav />

      {/* Main Content */}
      <div className="flex-grow ml-64 p-10 min-h-screen bg-gray-100 flex flex-col items-center">
        {/* User Greeting */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userData?.first_name}!
          </h1>
          <p className="text-lg text-gray-600 mt-2">{message}</p>
        </div>

        {/* Dashboard Sections */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
          {/* User Info Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-80 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
              {userData?.first_name?.charAt(0).toUpperCase() || "?"}
            </div>
            <h2 className="text-xl font-semibold mt-4">{userData?.first_name}</h2>
            <p className="text-gray-600">{userData?.department || "Unknown Department"}</p>
          </div>

          {/* Quick Links */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/games" className="text-green-600 hover:underline">
                  🎮 Play Games
                </a>
              </li>
              <li>
                <a href="/map" className="text-green-600 hover:underline">
                  🗺️ Interactive Map
                </a>
              </li>
              <li>
                <a href="/department" className="text-green-600 hover:underline">
                  🏥 About My Department
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
