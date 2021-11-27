import { createContext, useContext, useState } from "react";
import { auth } from "../utils/init-firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const value = {
    currentUser,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
