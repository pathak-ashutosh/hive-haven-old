import React, { useState } from 'react';
import axios from '../../axiosConfig';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/login', { email, password })
      .then((response) => {
        // Handle login success
        console.log('User logged in successfully.');
        // Save JWT to local storage
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        // Handle login error
        console.error('Error logging in:', error);
        // Clear form fields
        setEmail('');
        setPassword('');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      
    </>
  )
}

export default Login;