import { Publish } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsersContext } from "../../context/user/UserContext";
import upload from "../../utils/firestoreUpload";

import "./UserFormCard.css";

const UserFormCard = ({ userState }) => {
  const { dispatch } = useContext(UsersContext);
  const history = useHistory();
  const { user, setUser } = userState;

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const handleUpload = () => {
    //   upload()
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
          <div className="userUpdateUpload">
            <img className="userUpdateImg" src={user.avatar} alt="" />
            <label htmlFor="avatar">
              <Publish className="userUpdateIcon" />
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              style={{ display: "none" }}
            />
          </div>
          <button className="userUpdateButton">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UserFormCard;
