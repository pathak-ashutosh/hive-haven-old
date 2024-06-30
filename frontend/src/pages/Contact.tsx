// Header: Same as Home Page

// Content:
// Contact Form: Name, Email, Message
// Contact Information: Address, phone number, email
// Map: Embedded Google Map showing office location

// Footer: Same as Home Page

// Wireframe:
// -------------------------------------------------
// | Logo | Home | About | Services | Contact | Login/Signup |
// -------------------------------------------------
// | Contact Form: Name, Email, Message             |
// -------------------------------------------------
// | Contact Information: Address, Phone, Email     |
// -------------------------------------------------
// | Map: Embedded Google Map                       |
// -------------------------------------------------
// | Footer: Links, Social Media, Contact Info       |
// -------------------------------------------------

import { FC, FormEvent, ChangeEvent, useState } from 'react';
import axios from '../axiosConfig';
import { motion } from 'framer-motion';
import PrimarySubmitButton from '../components/buttons/PrimarySubmitButton';

const Contact: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('/contact', { name, email, subject, message })
      .then((response) => {
        console.log('Message sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
      <motion.div
        className="max-w-3xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "anticipate" }}
      >
        <div className='flex flex-col justify-center items-center'>
          <h1 className="text-3xl font-medium my-4 text-center">Contact <span className='text-yellow-500'>Us</span></h1>
          <p className='text-5xl font-semibold mb-4 tracking-tight'>We're here to help</p>
          <p className='w-4/5 text-center mb-8'>Get in touch with our sales and support teams for product questions, integration support, demos and more.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border shadow-md">
          <div className="relative mb-4">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              placeholder="Name"
              className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500"
            />
            <label
              className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              htmlFor="name"
            >
              Name
            </label>
          </div>
          <div className="relative mb-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
          </div>
          <div className="relative mb-4">
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
              required
              placeholder="Subject"
              className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500"
            />
            <label
              className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              htmlFor="subject"
            >
              Subject
            </label>
          </div>
          <div className="relative mb-4">
            <textarea
              id="message"
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              required
              placeholder="Message"
              className="bg-gray-100 appearance-none rounded-2xl w-full py-2 px-3 peer placeholder-transparent focus:outline-yellow-500 h-32"
            />
            <label
              className="absolute left-0 px-3 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2"
              htmlFor="message"
            >
              Message
            </label>
          </div>
          <div className="flex justify-center">
            <PrimarySubmitButton label="Send Message" Icon={null} />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;