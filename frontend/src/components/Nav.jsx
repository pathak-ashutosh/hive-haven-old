import { Link } from 'react-router-dom';
import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { PrimaryButton, SecondaryButton } from './Buttons';

const Nav = () => {
  return (
    <header className="p-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center">
        <div className='flex flex-col justify-between items-center md:flex-row w-full'>
          <Link to="/" className="flex flex-col md:flex-row gap-4 items-center">
            <img src={headerLogo} alt="Hive Haven Logo" width={30} height={30} />
            <p className='hidden md:block text-xl'>Hive Haven</p>
          </Link> 
          <ul className="flex flex-col sm:flex-row gap-8 max-md:hidden items-center text-lg">
            <li className="nav_item"><Link to="/about" className="nav_link">About</Link></li>
            <li className="nav_item"><Link to="/contact" className="nav_link">Contact</Link></li>
            <li className="nav_item">
              <Link to="/register" className="nav_link">
                <PrimaryButton label="Sign Up" Icon={null}/>
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/login" className="nav_link">
                <SecondaryButton label="Log In" Icon={null} />
              </Link>
            </li>
          </ul>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden max-md:block">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </nav>
    </header>
  );
};

export default Nav;
