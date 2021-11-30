/* eslint-disable jsx-a11y/anchor-has-content */

import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { login } from "../../context/auth/apiCalls";
import { useHistory, Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./login.css";

const RegisterPage = () => {
  const [user, setUser] = useState({});
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.hasOwnProperty("username") && user.hasOwnProperty("password")) {
      login(user, dispatch);
      history.push("/");
    } else {
      window.alert("Please fill in all of the fields");
    }
  };
  return (
    <div className="login">
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <div>
          <div className="row">
            <label>Username/Email</label>
            <input
              name="username"
              type="text"
              placeholder="your username or email"
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <div id="button" className="row">
            <button onClick={handleLogin} disabled={isFetching}>
              Log in
            </button>
          </div>
          <div className="row">
            <i> Don't have an account yet?</i>
            <Link to="/register" style={{ color: "black" }}>
              Sign up here
            </Link>
          </div>
        </div>
        <OtherMethods />
      </div>
    </div>
  );
};

export default RegisterPage;

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or log in with:</label>
    <div id="iconGroup">
      <Link to="https://fb.com">
        <FacebookIcon className="social" />
      </Link>
      <Link to="https://google.com">
        <GoogleIcon className="social" />
      </Link>
      <Link to="https://twitter.com">
        <TwitterIcon className="social" />
      </Link>
    </div>
  </div>
);
