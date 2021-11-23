import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./context/auth/AuthContext";
import MoviesContextProvider from "./context/movie/MovieContext";
import ListsContextProvider from "./context/list/ListContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListsContextProvider>
          <App />
        </ListsContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
