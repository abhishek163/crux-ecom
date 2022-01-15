import { createContext, useEffect, useContext, useReducer } from "react";
import { authReducer, setTokenToLocalStorage } from "./utils";
const authContext = createContext();

const authInitialState = {
  token: null,
  userData: null,
  userID: null,
  isUserLogin: false,
};

export default function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    authState.isUserLogin === true
      ? setTokenToLocalStorage(authState.token)
      : localStorage.clear();
  }, [authState.isUserLogin, authState.token]);

  return (
    <authContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
