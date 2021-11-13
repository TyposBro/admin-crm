import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import Axios from "../../utils/axios";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const { data } = await axios.get("/users?new=true", {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODViZmQ5Njg3NTA3OWUxYTg4YjBiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjgwNjg1NSwiZXhwIjoxNjM2ODkzMjU1fQ.kWeY9IyQW_WrbkmzkBG11BWX25UG0qId-lhkA-l2EX0",
          },
        });
        setNewUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {newUsers &&
        newUsers.map((user) => (
          <ul className="widgetSmList">
            <li className="widgetSmListItem">
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
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          </ul>
        ))}
    </div>
  );
}
