import React from 'react';
import LoggedInNav from '../includes/LoggedInNav';

function Department() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md">
        <LoggedInNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Department</h1>
      </div>
    </div>
  );
}

export default Department;
