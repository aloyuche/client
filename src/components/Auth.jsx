import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import SigninImage from "../asset/signup.jpg";

const InitialState = {
  fullname: "",
  username: "",
  password: "",
  confirmpassword: "",
  phoneNumber: "",
  avatarUrl: "",
};

const cookies = new Cookies();
const Auth = () => {
  const [form, setForm] = useState(InitialState);

  const [isSignUP, setIsSignUP] = useState(true);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, username, password, phoneNumber, avatarUrl } = form;

    const URL = "http://localhost:5500/auth";
    /// To connect to mongoDb use
    // const URL = "http://localhost:5500/api

    const {
      data: { token, userID, hashedPassword },
    } = await axios.post(`${URL}/${isSignUP ? "signup" : "login"}`, {
      username,
      password,
      fullname,
      phoneNumber,
      avatarUrl,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullname", fullname);
    cookies.set("userID", userID);

    if (isSignUP) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarUrl", avatarUrl);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };
  const switchMode = () => {
    setIsSignUP((prevIsSignUp) => !prevIsSignUp);
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUP ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">UserName:</label>
              <input
                type="text"
                placeholder="UserName"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarUrl">Avatar:</label>
                <input
                  type="text"
                  placeholder="Avatar"
                  name="avatarUrl"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUP ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            {isSignUP ? "Already have an Account " : "Don't have an account"}{" "}
            <span onClick={switchMode}>
              {isSignUP ? "  Sign In" : "Sign Up"}
            </span>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SigninImage} alt="Sign In" />
      </div>
    </div>
  );
};

export default Auth;
