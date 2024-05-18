import React, { useState } from 'react';
import axios from '../axiosConfig';

const Signup = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server
    axios.post('/register', { name, email, password })
      .then((response) => {
        // Handle registration success
        console.log('User registered successfully.');
      })
      .catch((error) => {
        // Handle registration error
        console.error('Error registering user:', error);
      });

    // Clear form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => {
              if (!e.target.value.endsWith('.edu')) {
                alert('Only .edu email addresses are allowed.');
                setEmail('');
              }
            }}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
