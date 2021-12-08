import "./newUser.css";
import { useContext, useState } from "react";
import { UsersContext } from "../../context/user/UserContext";
import { createUser } from "../../context/user/apiCalls";
import { useHistory } from "react-router";

export default function NewUser() {
  const { dispatch } = useContext(UsersContext);
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  const check = () => {
    const props = ["username", "email", "fullname", "password", "isAdmin"];
    for (let i = 0; i < props.length; i++) {
      if (!user.hasOwnProperty(props[i])) {
        window.alert("Please fill in the " + props[i] + "");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (check()) {
      const res = await createUser(user, dispatch);
      if (res) {
        history.push("/users");
      } else {
        history.push("/newUser");
      }
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="john"
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="fullname"
            placeholder="John Smith"
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            onChange={handleChange}
            autoComplete="current-password"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Status</label>
          <div onChange={handleChange} className="newUserGender">
            <input type="radio" name="isAdmin" id="user" value={false} />
            <label htmlFor="user">User</label>
            <input type="radio" name="isAdmin" id="admin" value={true} />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <button onClick={handleSubmit} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
