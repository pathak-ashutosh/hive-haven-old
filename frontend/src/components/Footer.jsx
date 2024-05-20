import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

  return (
    <footer className="bg-gray-800 text-white font-inter p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-yellow-500 mb-4">hiveHaven</h2>
          <p className="mb-4">
            Connecting International Students with Trusted Accommodations Across the US.
          </p>
          <p>1234 Street Name, City, State, 12345</p>
          <p>Email: info@company.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>

        {/* Quick Links */}
        <div>
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
        </div>

        {/* Social Media */}
        <div>
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
        </div>

        {/* Newsletter Subscription */}
        <div>
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
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} hiveHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;