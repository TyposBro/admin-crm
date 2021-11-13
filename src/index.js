import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContext from "./context/auth/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById("root")
);
