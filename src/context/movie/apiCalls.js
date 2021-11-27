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

import getLocalUser from "../../utils/check_jwt";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  try {
    const { token } = getLocalUser();

    const { data } = await axios.get("/movies", {
      headers: { token },
    });
    dispatch(getMoviesSuccess(data));
    return true;
  } catch (error) {
    dispatch(getMoviesFailure());
    return false;
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());

  try {
    const { token } = getLocalUser();

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

  try {
    const { token } = getLocalUser();

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

  try {
    const { token } = getLocalUser();

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
