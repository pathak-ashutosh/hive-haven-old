import { FC, ChangeEvent, FormEvent, useRef, useState } from 'react';
import PrimarySubmitButton from '../components/buttons/PrimarySubmitButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { supabase } from '../utils/supabase';
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const captcha = useRef<HCaptcha>(null);

  const siteKey = process.env.REACT_APP_HCAPTCHA_SITE_KEY;

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Authenticate user with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { 
        captchaToken: captchaToken || "",
      }
    });

    if (error) {
      setMessage("Error logging in the user: " + error.message);
      setMessageType("error");
    } else {
      setMessage("User logged in successfully.");
      setMessageType("success");
      navigate("/properties");
    }

    // Clear form fields
    setEmail("");
    setPassword("");
  };

  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="justify-center items-center flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <p className="text-sm">All fields are required</p>
      </div>

      {message && (
        <div className={`mt-4 px-4 py-2 rounded-3xl text-sm ${messageType === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
        <div className="relative mb-4">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
        </div>
        <div className="relative mb-4">
          <input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
        </div>
        <div className="mb-4 flex flex-row justify-between items-center">
          <Link to="/forgot-password" className="text-sm text-pink hover:text-bold pl-2">
            Forgot Password?
          </Link>
        </div>

        <div className="flex mt-4 justify-center">
          <HCaptcha ref={captcha} sitekey={siteKey || ''} onVerify={setCaptchaToken} />
        </div>

        <div className="mt-4 flex flex-col items-stretch max-md:flex-col gap-3 justify-center">
          <PrimarySubmitButton label="Login" Icon={null} />
          <Link to="/signup" className='flex flex-col items-stretch'>
            <SecondaryButton label="Don't have an account? Sign up" Icon={null} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
