import { useContext, useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { updateList } from "../../context/list/apiCalls";
import { ListsContext } from "../../context/list/ListContext";
import { MoviesContext } from "../../context/movie/MovieContext";
import { getMovies } from "../../context/movie/apiCalls";
import Loader from "react-loader-spinner";

import "./listItem.css";

export default function ListItem() {
  const { dispatch } = useContext(ListsContext);
  const location = useLocation();
  const [list, setList] = useState(location.state.list);
  const { movies, dispatch: dispatchMovies } = useContext(MoviesContext);
  const [pageSize, setPageSize] = useState(5);
  const [content, setContent] = useState(list.content);
  const [redirect, setRedirect] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={row.img} alt="" />
            {row.title}
          </div>
        );
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
  useEffect(() => {
    getMovies(dispatchMovies).then((elem) =>
      setContent(location.state.list.content)
    );
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [dispatchMovies, location]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateList({ ...list, content }, dispatch);
    setRedirect(result);
  };

  return redirect ? (
    <Redirect to="/lists" />
  ) : (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newlist">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder={list.title}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={list.genre}
              onChange={handleChange}
            />
          </div>

          <div className="productFormLeft">
            <label>Type</label>
            <select
              value={list.type}
              id="type"
              name="type"
              onChange={handleChange}
            >
              <option></option>
              <option value="Movies">Movies</option>
              <option value="Series">Series</option>
            </select>
          </div>
        </form>
      </div>
      <div className="tableContainer" style={{ maxWidth: "100%" }}>
        {spinner ? (
          <Loader type="Puff" color="Grey" height={100} width={100} />
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
      <button className="productButton" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}
