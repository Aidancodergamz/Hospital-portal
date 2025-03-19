import React from 'react';
import LoggedInNav from '../includes/LoggedInNav';

function Games() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <LoggedInNav />
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center min-h-screen ml-64">
        <h1 className="text-2xl font-bold">Welcome to the Games Page</h1>
      </div>
    </div>
  );
}

export default Games;
