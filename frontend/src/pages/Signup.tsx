import { FC, FormEvent, ChangeEvent, useRef, useState } from "react";
import { supabase } from "../utils/supabase";
import PrimarySubmitButton from "../components/buttons/PrimarySubmitButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Signup: FC = () => {
  // State variables for form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
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

    // Determine role flags
    const isStudent = role === "student";
    const isLandlord = role === "landlord";

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        captchaToken: captchaToken || "",
      }
    });
    
    // Reset captcha after submission to prevent re-use of the token
    captcha.current?.resetCaptcha();

    if (authError) {
      setMessage("Error signing up the user: " + authError.message);
      setMessageType("error");
      return;
    }

    // Create user profile
    const { user } = authData;
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: user?.id,
          is_student: isStudent,
          is_landlord: isLandlord,
        },
      ]);

    if (profileError) {
      setMessage("Error creating user profile: " + profileError.message);
      setMessageType("error");
    } else {
      setMessage("User signed up successfully.");
      setMessageType("success");
      navigate("/login");
    }

    // Clear form fields
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
      <div className="justify-center items-center flex flex-col"
      >
        <h1 className="text-3xl font-bold mb-8">
          {role.charAt(0).toUpperCase() + role.slice(1)} Sign Up
        </h1>
        <p className="text-sm">All fields are required</p>
      </div>

      {message && (
        <div className={`mt-4 px-4 py-2 rounded-3xl text-sm ${messageType === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-8 w-full max-w-md">
        <div className="relative mb-4"
        >
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
        <div className="relative mb-4"
        >
          <input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
        </div>
        <div className="mb-4 flex flex-row justify-center items-center gap-2"
        >
          <p className="text-gray-600">Select your role:</p>
          <div className="flex items-center">
            <input
              id="student"
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
              required
              className="mr-2"
            />
            <label htmlFor="landlord" className="text-gray-600">Landlord</label>
          </div>
        </div>

        <div className="flex mt-4 justify-center">
          <HCaptcha ref={captcha} sitekey={siteKey || ''} onVerify={setCaptchaToken} />
        </div>

        <div className="mt-4 flex flex-row max-md:flex-col gap-4 justify-center items-center"
        >
          <PrimarySubmitButton label="Create Account" Icon={null} />
          <Link to="/login">
            <SecondaryButton label="Log In Instead" Icon={null} />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
