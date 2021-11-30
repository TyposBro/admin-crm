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
