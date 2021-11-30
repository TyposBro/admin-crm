import axios from "../../utils/axios";
// import axios from "axios";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const { data } = await axios.post("/auth/login", user);
    dispatch(loginSuccess(data));
    return true;
  } catch (error) {
    dispatch(loginFailure());
    return false;
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());

  try {
    const { data } = await axios.post("/auth/register", user);
    dispatch(registerSuccess(data));
    return true;
  } catch (error) {
    dispatch(registerFailure());
    return false;
  }
};

export const logout = (dispatch) => {
  dispatch(logoutStart());
};
