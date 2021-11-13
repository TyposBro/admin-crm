/* eslint-disable jsx-a11y/anchor-has-content */
import "./login.css";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };
  return (
    <div className="login">
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <div>
          <div className="row">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div id="button" className="row">
            <button onClick={handleLogin}>Log in</button>
          </div>
        </div>
        <OtherMethods />
      </div>
    </div>
  );
};

export default LoginPage;

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <a href="https://fb.com" id="facebookIcon" />
      <a href="https://twitter.com" id="twitterIcon" />
      <a href="https://google.com" id="googleIcon" />
    </div>
  </div>
);
