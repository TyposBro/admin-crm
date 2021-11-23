import axios from "../../utils/axios";
// import axios from "axios";

import {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  deleteListStart,
  deleteListFailure,
  deleteListSuccess,
  createListStart,
  createListSuccess,
  createListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.get("/lists", {
      headers: { token },
    });
    dispatch(getListsSuccess(data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    await axios.delete(`/lists/${id}`, {
      headers: { token },
    });
    dispatch(deleteListSuccess(id));
  } catch (error) {
    dispatch(deleteListFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.post(`/lists`, list, {
      headers: { token },
    });
    dispatch(createListSuccess(data));
    return true;
  } catch (error) {
    dispatch(createListFailure());
    return false;
  }
};

export const updateList = async (list, dispatch) => {
  dispatch(updateListStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.put(`/lists/${list._id}`, list, {
      headers: { token },
    });
    dispatch(updateListSuccess(data));
    return true;
  } catch (error) {
    dispatch(updateListFailure());
    return false;
  }
};
