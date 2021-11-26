import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/user/UserContext";
import { getUsers, deleteUser } from "../../context/user/apiCalls";
import Loader from "react-loader-spinner";

export default function UserList() {
  const { users, dispatch } = useContext(UsersContext);
  const [spinner, setSpinner] = useState(true);

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
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
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
      width: 200,
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
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        />
      ) : (
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}
    </div>
  );
}
