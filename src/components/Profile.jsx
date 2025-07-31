import React from "react";

const UserProfile = ({ user }) => {
  if (!user) return null;

  // const 


  return (
    <div className="mt-5 h-screen min-h-8/12 pt-4 flex items-center justify-center ">
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow p-6 text-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatarUrl || "https://via.placeholder.com/80"}
            alt="User avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700 text-sm">
            {user.about || "This user loves good music!"}
          </p>
        </div>

        <div className="mt-4 flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Edit Profile
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
