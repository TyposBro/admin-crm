import reducers from "./ListReducers";

import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  lists: [],
  isFetching: false,
  error: false,
};

export const ListsContext = createContext(INITIAL_STATE);

const ListsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  return (
    <ListsContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
