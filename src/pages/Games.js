import React, { useEffect, useState } from "react";
import LoggedInNav from "../includes/LoggedInNav";

function Games() {
  const [userAge, setUserAge] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Array of games with names, links, images, and background colors
  const games = [
    {
      name: "Pac-Man",
      link: "https://freepacman.org/",
      image: "/assets/images/pacman.png",
      bgColor: "bg-red-500",
    },
    {
      name: "Tetris",
      link: "https://tetris.com/play-tetris",
      image: "/assets/images/tetris.png",
      bgColor: "bg-blue-500",
    },
    {
      name: "Snake",
      link: "https://playsnake.org/",
      image: "/assets/images/snake.png",
      bgColor: "bg-green-500",
    },
    {
      name: "Minesweeper",
      link: "https://minesweeper.online/",
      image: "/assets/images/minesweep.png",
      bgColor: "bg-yellow-500",
    },
    {
      name: "Chess",
      link: "https://www.chess.com/play",
      image: "/assets/images/chess.png",
      bgColor: "bg-teal-500",
      minAge: 14,
    },
    {
      name: "Sudoku",
      link: "https://www.websudoku.com/",
      image: "/assets/images/sudoku.png",
      bgColor: "bg-purple-500",
      minAge: 14,
    },
  ];

  useEffect(() => {
    const fetchUserAge = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, user might not be logged in.");
          return;
        }

        const response = await fetch("http://localhost:5000/check-age", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Ensure it's correctly formatted
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        console.log("Age check response:", data);

        setUserAge(data.allowed ? 14 : 0);
      } catch (error) {
        console.error("Error fetching user age:", error);
      } finally {
        setLoading(false); // Set loading to false after the data has been fetched
      }
    };

    fetchUserAge();
  }, []);

  return (
    <div className="flex">
      <LoggedInNav />

      <div className="flex-grow min-h-screen p-6 ml-64 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Games Page</h1>
          <p className="text-1xl font-bold text-center mb-6">
            Remember, to play some games you must be at least 14 years old!
          </p>

          {loading ? (
            <p>Loading user data...</p> // Or a spinner
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <a
                  key={index}
                  href={userAge >= (game.minAge || 0) ? game.link : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg ${
                    userAge < (game.minAge || 0) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-48 object-contain"
                  />
                  <div className={`p-4 ${game.bgColor}`}>
                    <h2 className="text-lg font-bold text-white">{game.name}</h2>
                    <p className="text-white">
                      {userAge >= (game.minAge || 0)
                        ? "Click to play"
                        : game.minAge === 14
                        ? "Sorry, you must be 14+"
                        : ""}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Games;
