import reducers from "./AuthReducers";
import { createContext, useReducer, useEffect } from "react";
import getLocalUser from "../../utils/check_jwt";

const INITIAL_STATE = {
  user: getLocalUser(),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(() => {
    
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
