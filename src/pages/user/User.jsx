import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserCard from "../../components/userCard/UserCard";
import UserFormCard from "../../components/userFormCard/UserFormCard";
import "./user.css";

export default function User() {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <UserCard user={user} />
        <UserFormCard userState={{ user, setUser }} />
      </div>
    </div>
  );
}
