export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => {
  console.log("LOGIN Success");
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});
