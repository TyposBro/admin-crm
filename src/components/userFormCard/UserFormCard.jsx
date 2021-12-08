import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import upload from "../../utils/firestoreUpload";
import { UsersContext } from "../../context/user/UserContext";
import { updateUser } from "../../context/user/apiCalls";
import PublishIcon from "@mui/icons-material/Publish";

import "./UserFormCard.css";

const UserFormCard = ({ userState }) => {
  const { dispatch } = useContext(UsersContext);
  const history = useHistory();
  const { user, setUser } = userState;
  const [ready, setReady] = useState(true);

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const label = e.target.name;
    upload([{ file, label }], setUser, setReady);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await updateUser(user, dispatch);
    if (res) {
      history.push("/users");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>

      <form className="userUpdateForm">
        <div className="userUpdateLeft">
          <div className="userUpdateItem">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder={user.username}
              className="userUpdateInput"
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder={user.fullname}
              className="userUpdateInput"
              onChange={handleChange}
            />
          </div>
          <div className="userUpdateItem">
            <label>Email</label>
            <input
              name="email"
              type="text"
              placeholder={user.email}
              className="userUpdateInput"
              onChange={handleChange}
            />
          </div>

          <div className="userUpdateItem">
            <label>Phone</label>
            <input
              type="text"
              placeholder="+1 123 456 67"
              className="userUpdateInput"
            />
          </div>
          <div className="userUpdateItem">
            <label>Address</label>
            <input
              type="text"
              placeholder="New York | USA"
              className="userUpdateInput"
            />
          </div>
        </div>
        <div className="userUpdateRight">
          {ready ? (
            <div className="userUpdateUpload">
              <img className="userUpdateImg" src={user.avatar} alt="" />
              <label htmlFor="avatar">
                <PublishIcon className="userUpdateIcon" />
              </label>
              <input
                onChange={handleUpload}
                type="file"
                name="avatar"
                id="avatar"
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <Loader type="Puff" color="Grey" height={100} width={100} />
          )}
          <button onClick={handleSubmit} className="userUpdateButton">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormCard;
