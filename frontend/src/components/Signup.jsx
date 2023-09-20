import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Error messages for form validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Signup Hook
  const { signup, isLoading } = useSignup();

  const handleClose = () => {
    props.onFormSubmit();
  }

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (page reload)
    e.preventDefault(); 

    // Clear previous error messages
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");
    
    // Validate form inputs
    if (!email) {
      setEmailError("Please enter an email.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      return;
    }

    try {
      // Attempt to login with the provided email and password
      await signup(email, password);
      props.onFormSubmit();
    } catch (error) {
      // If an error occurs during login, this error message will display
      setErrorMessage("Signup failed. Please check if your username and password is correct."); // Change this after discussing with group
    }
  };

  return (
    <div className="signup-wrapper">
      <div className='signup-container'>
        <p className="close-btn" onClick={handleClose}>X</p>
        <h2>Sign up</h2>
        <form className="signup" onSubmit={handleSubmit}>

          <div className="email-input">
            <label>
              <h4>Email:</h4>
              <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="error">{emailError}</p>
            </label>
          </div>
          
          <div className="password-input">
            <label>
              <h4>Password:</h4>
              <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className="error">{passwordError}</p>
            </label>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <p className="login-account-btn">Have an account? <span>Log in</span></p>
          <button className="signup-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>  
    </div>
  );
};

export default Signup;

