export const getUsersStart = () => ({
  type: "GET_USERS_START",
});

export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

export const getUsersFailure = () => ({
  type: "GET_USERS_FAILURE",
});

export const deleteUserStart = () => ({
  type: "DELETE_USERS_START",
});

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USERS_SUCCESS",
  payload: id,
});

export const deleteUserFailure = () => ({
  type: "DELETE_USERS_FAILURE",
});

export const createUserStart = () => ({
  type: "CREATE_USERS_START",
});

export const createUserSuccess = (user) => ({
  type: "CREATE_USERS_SUCCESS",
  payload: user,
});

export const createUserFailure = () => ({
  type: "CREATE_USERS_FAILURE",
});

export const updateUserStart = () => ({
  type: "UPDATE_USERS_START",
});

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USERS_SUCCESS",
  payload: user,
});

export const updateUserFailure = () => ({
  type: "UPDATE_USERS_FAILURE",
});
