import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// custom hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    // Error check
    if (!context) {
        throw Error("useAuthContext must be used inside of AuthContextProvider");
    }

    return context;
};