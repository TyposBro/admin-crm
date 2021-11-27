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

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
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
  const { token } = JSON.parse(localStorage.getItem("user"));

  try {
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
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
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
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
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
