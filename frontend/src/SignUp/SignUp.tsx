import React, { useState } from "react";
import './SignUp.css';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phNum: string;
  renter: string | number;
  seeker: string | number;
  password: string;
  confirmPwd: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phNum: "",
    renter: "",
    seeker: "",
    password: "",
    confirmPwd: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform signup logic with formData
    console.log(formData);
  };

  return (
    <div>
      <div className="noSpace heading">Sign Up Page</div>
      <p className="noSpace fields">Please enter details to Create your account</p>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <p className="noSpace fields">Student Email</p>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="abc@gmu.edu"
            className="inputBox noSpaceInput"
          />
        </div>
        <div className="twoCol">
        <div className="firstRow">
          <p className="noSpace fields">First Name</p>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="John"
            className="inputBox noSpaceInput"
          />
        </div>
            <div>
            <p className="noSpace fields">Last Name</p>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Wick"
                className="inputBox noSpaceInput"
            />
            </div>
        </div>
        <div>
          <p className="noSpace fields">Phone number</p>
          <input
            type="text"
            id="CNumber"
            name="CNumber"
            value={formData.phNum}
            onChange={handleChange}
            required
            placeholder="+1 990 292 99999"
            className="inputBox noSpaceInput"
          />
        </div>
        <div className="noSpace fields">Student type</div>
        <div>
            <span className="firstRow">
                <input className="radioBtn noSpaceInput" type="radio" value={formData.renter}/>
                <label className="fields">renter</label>
            </span>
            <span>
                <input className="radioBtn noSpaceInput" type="radio" value={formData.seeker}/>
                <label className="fields">seeker</label>
            </span>
        </div>
        <div className="twoCol noSpace">
        <span className="firstRow">
          <div className="noSpace fields">Password</div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="*************"
            className="inputBox noSpaceInput"
          />
        </span>
        <span>
          <div className="noSpace fields">Confirm Password</div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.confirmPwd}
            onChange={handleChange}
            required
            placeholder="*************"
            className="inputBox noSpaceInput"
          />
        </span></div>
        <button type="submit" className="createBtn noSpace">Create Account</button>
      </form>
    </div>
  );
};

export default SignUpPage;
