import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import getLocalUser from "../../utils/check_jwt";
import Dropdown from "../popover/Popover";
import "./topbar.css";

export default function Topbar() {
  const user = getLocalUser().info;
  console.log(user);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/" className="topLeft">
          <img src="/img/ju5t.png" alt="" />
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Dropdown>
            <img src={user.avatar} alt="" className="topAvatar" />
          </Dropdown>
          {/* <div className="dropdown">
            <img src={user.avatar} alt="" className="topAvatar" />
            <div className="dropdown-content"></div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
