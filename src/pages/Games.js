import React, { useEffect, useState } from "react";
import LoggedInNav from "../includes/LoggedInNav";

function Games() {
  const [userAge, setUserAge] = useState(null);

  // Array of games with names, links, images, and background colors
  const games = [
    {
      name: "Pac-Man",
      link: "https://freepacman.org/",
      image: "/assets/images/pacman.png",
      bgColor: "bg-red-500",
      minAge: 14,
    },
    {
      name: "Tetris",
      link: "https://tetris.com/play-tetris",
      image: "/assets/images/tetris.png",
      bgColor: "bg-blue-500",
      minAge: 14,
    },
    {
      name: "Snake",
      link: "https://playsnake.org/",
      image: "/assets/images/snake.png",
      bgColor: "bg-green-500",
      minAge: 14,
    },
    {
      name: "Minesweeper",
      link: "https://minesweeper.online/",
      image: "/assets/images/minesweep.png",
      bgColor: "bg-yellow-500",
      minAge: 14,
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
    // Fetch the user's age from your API
    const fetchUserAge = async () => {
      try {
        const response = await fetch('/api/user-age?userId=1'); // Pass the actual user ID
        const data = await response.json();
        setUserAge(data.age);
      } catch (error) {
        console.error('Error fetching user age:', error);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <a
                key={index}
                href={userAge >= game.minAge ? game.link : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg ${
                  userAge < game.minAge ? "opacity-50 cursor-not-allowed" : ""
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
                    {userAge >= game.minAge ? "Click to play" : "Sorry, you must be 14+"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
