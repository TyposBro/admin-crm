import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createList } from "../../context/list/apiCalls";
import { ListsContext } from "../../context/list/ListContext";
import { MoviesContext } from "../../context/movie/MovieContext";
import { getMovies } from "../../context/movie/apiCalls";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "react-loader-spinner";

import "./newList.css";

export default function NewList() {
  const { dispatch } = useContext(ListsContext);
  const { movies, dispatch: dispatchMovies } = useContext(MoviesContext);
  const history = useHistory();
  const [list, setList] = useState({ type: "Movies" });
  const [pageSize, setPageSize] = useState(5);
  const [content, setContent] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getMovies(dispatchMovies);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [dispatchMovies]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bool = await createList({ ...list, content }, dispatch);
    if (bool) {
      history.push("/lists");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: ({ row }) => {
        return <div className="productListItem">{row.title}</div>;
      },
    },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "limit", headerName: "Age Limit", width: 150 },
    {
      field: "isSeries",
      headerName: "Type",
      width: 150,
      renderCell: ({ row }) => {
        return <>{row.isSeries ? "Series" : "Movie"}</>;
      },
    },
  ];

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="TOP-10 of all time"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Action"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select id="type" name="type" onChange={handleChange}>
            <option value="Movies">Movies</option>
            <option value="Series">Series</option>
          </select>
        </div>
      </form>
      <div className="tableContainer">
        {spinner ? (
          <Loader
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
            autoHeight
            onSelectionModelChange={(id) => {
              setContent(id);
            }} //added line
            selectionModel={content} //added line
          />
        )}
      </div>
      <button className="addProductButton" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
