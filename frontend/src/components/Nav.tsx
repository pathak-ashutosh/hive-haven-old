import { Link } from "react-router-dom";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { FC, useState, useEffect, useRef } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

const Nav: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  // To add border shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside of menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`px-12 max-md:px-8 py-4 fixed z-20 w-full transition-shadow duration-300 bg-white ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="flex justify-between items-center">
        <div className="flex flex-col justify-between md:flex-row w-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col md:flex-row gap-4 max-md:pl-8 items-center"
          >
            {/* <img src={headerLogo} alt="Hive Haven Logo" width={30} height={30} /> */}
            <p className="block text-xl font-bold hover:drop-shadow-sm">
              <span className="text-yellow-500">hive</span>Haven
            </p>
          </Link>

          {/* Navigation Links */}
          <ul
            ref={menuRef}
            className={`flex flex-row gap-2 max-md:hidden items-center text-md ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <li>
              <Link to="/about" className="px-2">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="px-4">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/signup" className="h-5 w-5">
                <PrimaryButton label="Sign Up" Icon={null} />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <SecondaryButton label="Log In" Icon={null} />
              </Link>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu */}
        <button
          className="w-6 h-6 hidden max-md:block cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className="pt-5 flex flex-col gap-4 items-stretch text-md md:hidden w-full"
        >
          <li className="border py-3 rounded-3xl text-center">
            <Link
              to="/about"
              className="p-4"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="border py-3 rounded-3xl text-center">
            <Link
              to="/contact"
              className="p-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <div className="flex flex-col gap-3 items-stretch">
            <li>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-stretch"
              >
                <PrimaryButton label="Sign Up" Icon={null} />
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-stretch"
              >
                <SecondaryButton label="Log In" Icon={null} />
              </Link>
            </li>
          </div>
        </ul>
      )}
    </header>
  );
};

export default Nav;
