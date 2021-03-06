import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import axios from "../../utils/axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const controller = new AbortController();
    const getNewUsers = async () => {
      try {
        const { data } = await axios.get("/users?new=true", {
          signal: controller.signal,
          headers: {
            token: user.token,
          },
        });
        setNewUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewUsers();
    return () => {
      controller.abort();
    };
  }, [user]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers &&
          newUsers.map((user) => (
            <li key={user._id} className="widgetSmListItem">
              <img
                src={
                  user.avatar ||
                  "https://avatar-cdn.tracker.gg/api/avatar/2/guitarkriss95.png"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
