import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { delay, motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const sectionVariants = (delay) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "anticipate", delay },
    },
  });

  return (
    <footer ref={footerRef} className="bg-gray-800 text-white font-inter p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants(0.2)}
        >
          <h2 className="text-xl font-bold text-yellow-500 mb-4">hiveHaven</h2>
          <p className="mb-4">
            Connecting International Students with Trusted Accommodations Across the US.
          </p>
          <p>1234 Street Name, City, State, 12345</p>
          <p>Email: info@company.com</p>
          <p>Phone: (123) 456-7890</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants(0.4)}
        >
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:underline">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/properties" className="hover:underline">Properties</Link>
            </li>
            <li className="mb-2">
              <Link to="/services" className="hover:underline">Services</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants(0.6)}
        >
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
              <FaXTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants(0.8)}
        >
          <h2 className="text-xl font-semibold text-yellow-500 mb-4">Newsletter</h2>
          <p className="mb-4">Subscribe to our newsletter to get the latest updates and offers.</p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 text-gray-800 rounded-3xl"
            />
            <button type="submit" className="w-full bg-yellow-500 text-gray-800 p-2 font-medium hover:bg-yellow-600 rounded-3xl">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} hiveHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;