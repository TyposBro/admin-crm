import axios from "../../utils/axios";
// import axios from "axios";

import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  deleteMovieStart,
  deleteMovieFailure,
  deleteMovieSuccess,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.get("/movies", {
      headers: { token },
    });
    dispatch(getMoviesSuccess(data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    await axios.delete(`/movies/${id}`, {
      headers: { token },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
  }
};

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.post(`/movies`, movie, {
      headers: { token },
    });
    dispatch(createMovieSuccess(data));
  } catch (error) {
    dispatch(createMovieFailure());
  }
};

export const updateMovie = async (movie, dispatch) => {
  dispatch(updateMovieStart());
  const token = JSON.parse(localStorage.getItem("user")).token;

  try {
    const { data } = await axios.put(`/movies/${movie._id}`, movie, {
      headers: { token },
    });
    dispatch(updateMovieSuccess(data));
    return true;
  } catch (error) {
    dispatch(updateMovieFailure());
    return false;
  }
};
