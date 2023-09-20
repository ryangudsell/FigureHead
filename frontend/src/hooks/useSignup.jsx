import { useState } from 'react';
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    // disables button while this code runs
    setIsLoading(true);
    // No current errors
    setError(null);

    // API CALL
    try {
        const response = await axios.post (
          "http://localhost:4000/api/user/signup",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        )
        // End of URL

        //  Bad response
        if (response.status !== 200) {
            setIsLoading(false);
            setError(error.response.data.error);
        }

        // If response = OK
        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));

            dispatch({ type: "LOGIN", payload: response.data });

            // Re enable the button
            setIsLoading(false);
        }
    } catch (error) {
        console.error(error.response.data.error);

        setError(error.response.data.error);
        setIsLoading(false);
    }
  }

  return { signup, isLoading, error}
}
