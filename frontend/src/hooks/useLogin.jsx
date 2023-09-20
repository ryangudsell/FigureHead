import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        // API CALL
        try {
            const response = await axios.post ("http://localhost:4000/api/user/login", 
            { email, password },
            { headers: { "Content-Type": "application/json" } }
            );
            // end of url

            // BAD RESPONSE
            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.data.error)
            }

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data))

                dispatch({ type: "LOGIN", payload: response.data })

                setIsLoading(false)
            }
        } catch (error) {
            console.error(error.response.data.error);

            setError(error.response.data.error)
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}