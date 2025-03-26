import React, { useState } from "react";
import LoggedInNav from '../includes/LoggedInNav';

function InteractiveMap() {
  
  const [activeMarker, setActiveMarker] = useState(null);

  const markerPositions = {
    X_ray: { top: "60%", left: "35%", color: "red", fontSize: "3rem", backgroundColor: "red" },
    Neurology: { top: "85%", left: "42%", color: "blue", fontSize: "3rem", backgroundColor: "blue" },
    Dental: { top: "80%", left: "30%", color: "green", fontSize: "3rem", backgroundColor: "green" },
    Main: { top: "80%", left: "10%", color: "teal", fontSize: "3rem", backgroundColor: "teal" },
    Cafe: { top: "90%", left: "50%", color: "purple", fontSize: "3rem", backgroundColor: "purple" },
    Play_room: { top: "50%", left: "65%", color: "orange", fontSize: "3rem", backgroundColor: "orange" },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <LoggedInNav />
      </div>

      {/* Main section */}
      <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Interactive Map</h1>
<p className="mt-2 text-gray-600 text-center mx-auto">Here is a map of the entire hospital that you can interact with. 😊</p>

        
        {/* Containers */}
        <div className="w-full flex flex-wrap text-white mt-4">
          {Object.keys(markerPositions).map((key) => (
            <div
              key={key}
              onClick={() => setActiveMarker(key)}
              className={`flex-1 min-w-[150px] sm:min-w-[200px] p-4 flex justify-center items-center cursor-pointer ${markerPositions[key].backgroundColor}`}
              style={{ backgroundColor: markerPositions[key].backgroundColor }}
            >
              {key.replace("_", " ")}
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="relative w-full mt-6">
          <img
            src="/assets/images/hospitalMap.png"
            alt="Hospital Map"
            className="h-full w-full"
          />
          {Object.keys(markerPositions).map((key) => (
            <div
              key={key}
              className={`absolute ${activeMarker === key ? "block" : "hidden"}`}
              style={{
                top: markerPositions[key].top,
                left: markerPositions[key].left,
                color: markerPositions[key].color,
                fontSize: markerPositions[key].fontSize,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="relative">
                <i className="fa-solid fa-map-pin"></i>
                <div className="absolute top-[-45px] left-[-20%] text-lg w-[120px] text-white px-3 py-1 rounded shadow-lg" 
                  style={{ backgroundColor: markerPositions[key].backgroundColor }}>
                  {key.replace("_", " ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
