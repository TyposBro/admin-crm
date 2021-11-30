export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logoutStart = () => ({
  type: "LOGOUT",
});

export const registerStart = () => ({
  type: "REGISTER_START",
});

export const registerSuccess = (user) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: user,
  };
};

export const registerFailure = () => ({
  type: "REGISTER_FAILURE",
});
