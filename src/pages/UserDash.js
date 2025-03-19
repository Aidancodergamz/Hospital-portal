import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNav from "../includes/LoggedInNav";

function UserDash() {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect if no token
      return;
    }

    fetch("http://localhost:5000/userdash", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Send JWT token to backend
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/login"); // Redirect if authentication fails
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        navigate("/login"); // Redirect on error
      });
  }, [navigate]);

  return (
    <>
    <LoggedInNav />
    <div>
      <h1>Welcome to your dashboard</h1>
    </div>
    </>
  );
}

export default UserDash;
