import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./context/auth/AuthContext";
import MoviesContextProvider from "./context/movie/MovieContext";
import ListsContextProvider from "./context/list/ListContext";
import UsersContextProvider from "./context/user/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListsContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </ListsContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
