import "./lists.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListsContext } from "../../context/list/ListContext";
import { deleteList, getLists } from "../../context/list/apiCalls.js";
import { useState } from "react";

export default function Lists() {
  const { lists, dispatch } = useContext(ListsContext);
  const [pageSize, setPageSize] = useState(8);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getLists(dispatch);

    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/list/" + params.row._id,
                state: { list: params.row },
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
          type="Puff"
          color="Grey"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        />
      ) : (
        <DataGrid
          rows={lists}
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
