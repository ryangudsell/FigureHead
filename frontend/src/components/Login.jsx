import { useState } from 'react';
import { useLogin } from "../hooks/useLogin";

const Login = (props) => {
  // Users Email and Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error messages for form validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Login Hook
  const { login, isLoading } = useLogin();
  
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
      await login(email, password);
      props.onFormSubmit();
    } catch (error) {
      // If an error occurs during login, this error message will display
      setErrorMessage("Login failed. Please check if your username and password is correct."); // Change this after discussing with group
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <p className="close-btn" onClick={handleClose}>X</p>
        <h2>Log in</h2>

        <form className="login" onSubmit={handleSubmit}>

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
          
          <p className="create-account-btn">Not registered? <span>Create an account</span></p>
          <button className="login-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Login..." : "Log in"}
          </button>
        </form>
        
      </div>      
    </div>
  );
};

export default Login;
