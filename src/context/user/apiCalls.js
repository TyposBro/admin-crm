import axios from "../../utils/axios";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./UserActions";
import getLocalUser from "../../utils/check_jwt";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());

  try {
    const { token } = getLocalUser();

    const { data } = await axios.get("/users", {
      headers: { token },
    });
    dispatch(getUsersSuccess(data));
    return true;
  } catch (error) {
    dispatch(getUsersFailure());
    return false;
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());

  try {
    const { token } = getLocalUser();

    await axios.delete(`/users/${id}`, {
      headers: { token },
    });

    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());

  try {
    const { token } = getLocalUser();

    const { data } = await axios.post(`/users`, user, {
      headers: { token },
    });
    dispatch(createUserSuccess(data));
  } catch (error) {
    dispatch(createUserFailure());
  }
};

export const updateUser = async (user, dispatch) => {
  dispatch(updateUserStart());

  try {
    const { token } = getLocalUser();

    const { data } = await axios.put(`/users/${user._id}`, user, {
      headers: { token },
    });
    dispatch(updateUserSuccess(data));
    return true;
  } catch (error) {
    dispatch(updateUserFailure());
    return false;
  }
};
