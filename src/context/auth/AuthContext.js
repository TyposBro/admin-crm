import reducers from "./AuthReducers";
import actions from "./AuthActions";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthConext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  return (
    <AuthConext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthConext.Provider>
  );
};

export default AuthContextProvider;
