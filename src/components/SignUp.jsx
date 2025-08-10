import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = ({ setIsLoggedIn,setUserData }) => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/users/create";
    // add a random userId to the formData
    formData.id = String(Math.floor(Math.random() * 10000) + 1);
    console.log("Form Data to be sent:", formData);
    axios
      .post(url, formData)
      .then((response) => {
        console.log("Signup successful", response.data);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLoggedIn(true);
        setUserData(response.data.user); // Assuming response contains user data
        navigate("/user");
        // Handle successful login, e.g., redirect or update state
      })
      .catch((error) => {
        console.error("Signup failed", error);
        // Handle login error, e.g., show an error message
      });
  };

  const randomUrl = (e) => {
  e.preventDefault(); // prevent form submission
  // const avatarOptions = [
  //   "https://i.pravatar.cc/150?img=1",
  //   "https://i.pravatar.cc/150?img=5",
  //   "https://i.pravatar.cc/150?img=10",
  //   "https://i.pravatar.cc/150?img=15",
  //   "https://i.pravatar.cc/150?img=20",
  // ];
  // const random = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
  setFormData((prev) => ({
    ...prev,
    avatarUrl: `https://avatar.iran.liara.run/public`,
  }));
};

  return (
    <div className="mt-5 h-screen min-h-8/12 pt-4 flex items-center justify-center">
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="displayName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="passwordHash"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              AvatarUrl
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="avatarUrl"
              value={formData?.avatarUrl || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your avatar URL"
            />
            <button onClick={randomUrl}>pick random</button>
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
          <Link to="/user" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
