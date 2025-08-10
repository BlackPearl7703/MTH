import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Login = ({ setIsLoggedIn, setUserData }) => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  console.log("hello prince")
 

  const submitHandler = (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/auth/login";
    console.log("Form Data to be sent:", formData);
    axios
      .post(url, formData)
      .then((response) => {
        console.log("Login successful", response.data);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUserData(response.data.user); // Assuming response contains user data
        setIsLoggedIn(true);
        navigate("/user");
      })
      .catch((error) => {
        
        console.error("Login failed", error);
      });
  };
  return (
    <div className="mt-5 h-screen min-h-8/12 pt-4 flex items-center justify-center">
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow p-6 text-gray-800">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">
              UserName
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
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
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <Link to="/signup" className="text-blue-600 hover:underline">
            Don't have an account? Signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
