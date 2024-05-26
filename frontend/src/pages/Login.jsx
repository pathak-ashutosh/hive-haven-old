import React, { useState } from 'react';
import axios from '../axiosConfig';
import PrimarySubmitButton from '../components/buttons/PrimarySubmitButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/login', { email, password })
      .then((response) => {
        console.log('User logged in successfully.');
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setEmail('');
        setPassword('');
      });
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
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <p className="text-sm">All fields are required</p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
        <motion.div className="relative mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.2}}
        >
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="bg-gray-100 appearance-none rounded-2xl w-full py-3 px-3 peer placeholder-transparent focus:outline-yellow-500"
          />
          <label
            className="absolute left-0 px-3 py-1 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
            htmlFor="email"
          >
            Email
          </label>
        </motion.div>
        <motion.div className="relative mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.4 }}
        >
          <input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="bg-gray-100 appearance-none rounded-2xl w-full py-3 px-3 peer placeholder-transparent focus:outline-yellow-500"
          />
          <label
            className="absolute left-0 px-3 py-1 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
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
        <motion.div className="mb-4 flex flex-row justify-between items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.6 }}
        >
          <Link to="/forgot-password" className="text-sm text-pink hover:text-bold pl-2">
            Forgot Password?
          </Link>
        </motion.div>

        <motion.div className="flex flex-col items-stretch max-md:flex-col gap-3 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "anticipate", delay: 0.8 }}
        >
          <PrimarySubmitButton label="Login" Icon={null} />
          <Link to="/signup" className='flex flex-col items-stretch'>
            <SecondaryButton label="Don't have an account? Sign up" Icon={null} />
          </Link>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
