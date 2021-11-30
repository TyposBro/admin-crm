import axios from "../../utils/axios";
// import axios from "axios";

import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
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

export const logout = (dispatch) => {
  dispatch(logoutStart());
};
