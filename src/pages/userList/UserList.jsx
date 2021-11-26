import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UsersContext } from "../../context/user/UserContext";
import { getUsers, deleteUser } from "../../context/user/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const { users, dispatch } = useContext(UsersContext);
  

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    console.log(id);
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
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => {
          if (r) {
            return r._id;
          }
          return Math.random();
        }}
      />
    </div>
  );
}
