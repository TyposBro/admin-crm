import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/user/UserContext";
import { getUsers, deleteUser } from "../../context/user/apiCalls";
import Loader from "react-loader-spinner";

export default function UserList() {
  const { users, dispatch } = useContext(UsersContext);
  const [spinner, setSpinner] = useState(true);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    getUsers(dispatch);

    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "fullname", headerName: "Full name", width: 200 },
    {
      field: "user",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.avatar || "/img/anonymous.png"}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (params.row.isAdmin ? "Admin" : "User"),
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              className="Link"
              to={{
                pathname: "/user/" + params.row._id,
                state: { user: params.row },
              }}
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {spinner ? (
        <Loader type="Puff" color="Grey" height={100} width={100} />
      ) : (
        <DataGrid
          rows={users}
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
