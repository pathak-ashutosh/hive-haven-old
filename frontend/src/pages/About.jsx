// Header: Same as Home Page
// Content:
// Mission Statement
// Team Introduction
// Why Choose Us
// Footer: Same as Home Page

// Wireframe:
// -------------------------------------------------
// | Logo | Home | About | Services | Contact | Login/Signup |
// -------------------------------------------------
// | Mission Statement                              |
// -------------------------------------------------
// | Team Introduction                              |
// -------------------------------------------------
// | Why Choose Us                                  |
// -------------------------------------------------
// | Footer: Links, Social Media, Contact Info       |
// -------------------------------------------------

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16 bg-gray-100">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "anticipate" }}
      >
        <h1 className="text-5xl font-semibold mb-8 tracking-tight">
          <span>Access to <span className='text-yellow-500'>comfortable</span> and </span>
          <br />
          <span><span className='text-yellow-500'>safe</span> living spaces</span> 
        </h1>
        <p className="text-lg mb-4">
          Welcome to <span className="text-yellow-500">hiveHaven</span>, your trusted platform for connecting international students with reliable accommodations across the US.
        </p>
        <p className="text-lg mb-4">
          Our mission is to provide a seamless and secure experience for students seeking a home away from home. We understand the challenges of finding the right place to live, especially in a new country, and we are here to make that process easier for you.
        </p>
        <p className="text-lg mb-4">
          At <span className="text-yellow-500">hiveHaven</span>, we are committed to offering a wide range of verified properties, ensuring that you have access to safe and comfortable living spaces. Our team is dedicated to supporting you every step of the way, from searching for properties to finalizing your lease.
        </p>
        <p className="text-lg">
          Thank you for choosing <span className="text-yellow-500">hiveHaven</span>. We look forward to helping you find your perfect home away from home.
        </p>
      </motion.div>
    </div>
  );
};

export default About;