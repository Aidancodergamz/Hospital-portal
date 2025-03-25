import React from "react";
import LoggedInNav from "../includes/LoggedInNav";

function Games() {
  // Array of games with names, links, images, and background colors
  const games = [
    {
      name: "Pac-Man",
      link: "https://freepacman.org/",
      image: "/assets/images/pacman.png",
      bgColor: "bg-red-500", // Add a background color
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
    },
    {
      name: "Sudoku",
      link: "https://www.websudoku.com/",
      image: "/assets/images/sudoku.png",
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <LoggedInNav />

      {/* Main Content */}
      <div className="flex-grow min-h-screen p-6 ml-64 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Games Page</h1>
          <p className="text-1xl font-bold text-center mb-6">Remember, to play some games you must be at least 14 years old!</p>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <a
                key={index}
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-48 object-contain" // changed object-cover to object-contain for better fit
                />
                <div className={`p-4 ${game.bgColor}`}>
                  <h2 className="text-lg font-bold text-white">{game.name}</h2>
                  <p className="text-white">Click to play</p>
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
