import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link } from "react-router-dom";
import getLocalUser from "../../utils/check_jwt";
import Dropdown from "../popover/Popover";
import "./topbar.css";

export default function Topbar() {
  const user = getLocalUser().info;
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/" className="topLeft">
          <img src="/img/ju5t.png" alt="" />
        </Link>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
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
