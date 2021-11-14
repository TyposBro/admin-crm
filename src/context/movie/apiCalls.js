import axios from "../../utils/axios";
// import axios from "axios";

import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  deleteMovieStart,
  deleteMovieFailure,
  deleteMovieSuccess,
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
