import "./movieList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { MoviesContext } from "../../context/movie/MovieContext";
import { deleteMovie, getMovies } from "../../context/movie/apiCalls.js";

export default function MovieList() {
  const [pageSize, setPageSize] = useState(8);
  const { movies, dispatch } = useContext(MoviesContext);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getMovies(dispatch);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Age Limit", width: 120 },
    {
      field: "isSeries",
      headerName: "Type",
      width: 120,
      renderCell: (params) => {
        return params.row.isSeries ? "Series" : "Movie";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/movie/" + params.row._id,
                state: { movie: params.row },
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {spinner ? (
        <Loader
          className="spinner"
          type="Puff"
          color="Grey"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        />
      ) : (
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 8, 10, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}
    </div>
  );
}
