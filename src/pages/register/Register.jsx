/* eslint-disable jsx-a11y/anchor-has-content */
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { register } from "../../context/auth/apiCalls";
import { useHistory, Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./register.css";

const RegisterPage = () => {
  const [user, setUser] = useState({});
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      user.hasOwnProperty("email") &&
      user.hasOwnProperty("username") &&
      user.hasOwnProperty("password")
    ) {
      register(user, dispatch);
      history.push("/");
    } else {
      window.alert("Please fill in all of the fields");
    }
  };
  return (
    <div className="login">
      <div id="loginform">
        <h2 id="headerTitle">Resgiter</h2>
        <div>
          <div className="row">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Choose your username"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
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
            <button onClick={handleRegister} disabled={isFetching}>
              Sign up
            </button>
          </div>
          <div className="row">
            <i> Already have an account?</i>
            <Link to="/login" style={{ color: "black" }}>
              Log in here
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
    <label>Or sign up with:</label>
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
