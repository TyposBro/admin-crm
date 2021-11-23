import "./lists.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListsContext } from "../../context/list/ListContext";
import { deleteList, getLists } from "../../context/list/apiCalls.js";
import { useState } from "react";

export default function Lists() {
  const { lists, dispatch } = useContext(ListsContext);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "type", width: 120 },
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
    </div>
  );
}
