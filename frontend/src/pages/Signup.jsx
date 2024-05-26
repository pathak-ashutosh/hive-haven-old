import React, { useState } from "react";
import axios from "../axiosConfig";
import PrimarySubmitButton from "../components/buttons/PrimarySubmitButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Signup = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server
    axios
      .post("/signup", { name, email, password, role })
      .then((response) => {
        // Handle sign up success
        console.log("User signed up successfully.");
      })
      .catch((error) => {
        // Handle sign up error
        console.error("Error signing up the user:", error);
      });

    // Clear form fields
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div className="justify-center items-center flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "anticipate", delay: 0.2}}
      >
        <h1 className="text-3xl font-bold mb-8">
          {role.charAt(0).toUpperCase() + role.slice(1)} Sign Up
        </h1>
        <p className="text-sm">All fields are required</p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
        <motion.div className="relative mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.2}}
        >
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
            className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500"
          />
          <label
            className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
            htmlFor="name"
          >
            Full Name
          </label>
        </motion.div>
        <motion.div className="relative mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.4 }}
        >
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500"
          />
          <label
            className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
            htmlFor="email"
          >
            Email
          </label>
        </motion.div>
        <motion.div className="relative mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.6 }}
        >
          <input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500"
          />
          <label
            className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
            htmlFor="password"
          >
            Password
          </label>
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={handleTogglePasswordVisibility}
          >
            {isPasswordVisible ? <IoEye size={20} color="gray" /> : <IoEyeOff size={20} color="gray" />}
          </span>
        </motion.div>
        <motion.div className="mb-4 flex flex-row justify-center items-center gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.8 }}
        >
          <p className="text-gray-600">Select your role:</p>
          <div className="flex items-center">
            <input
              id="student"
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mr-2"
            />
            <label htmlFor="student" className="text-gray-600">Student</label>
          </div>
          <div className="flex items-center">
            <input
              id="landlord"
              type="radio"
              name="role"
              value="landlord"
              checked={role === "landlord"}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mr-2"
            />
            <label htmlFor="landlord" className="text-gray-600">Landlord</label>
          </div>
        </motion.div>

        <motion.div className="flex flex-row max-md:flex-col gap-2 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 1 }}
        >
          <PrimarySubmitButton label="Create Account" Icon={null} />
          <Link to="/login" className="max-md:mt-2">
            <SecondaryButton label="Log In Instead" Icon={null} />
          </Link>
        </motion.div>
      </form>
    </div>
  );
};

export default Signup;
