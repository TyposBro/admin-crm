import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

import "./userCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="userShow">
      <div className="userShowTop">
        <img src={user.avatar} alt="" className="userShowImg" />
        <div className="userShowTopTitle">
          <span className="userShowUsername">{user.fullname}</span>
          <span className="userShowUserTitle">
            {user.isAdmin ? "Admin" : "User"}
          </span>
        </div>
      </div>
      <div className="userShowBottom">
        <span className="userShowTitle">Account Details</span>
        <div className="userShowInfo">
          <PermIdentityIcon className="userShowIcon" />
          <span className="userShowInfoTitle">{user.username}</span>
        </div>
        <div className="userShowInfo">
          <CalendarTodayIcon className="userShowIcon" />
          <span className="userShowInfoTitle">10.12.1999</span>
        </div>
        <span className="userShowTitle">Contact Details</span>
        <div className="userShowInfo">
          <PhoneAndroidIcon className="userShowIcon" />
          <span className="userShowInfoTitle">+1 123 456 67</span>
        </div>
        <div className="userShowInfo">
          <MailOutlineIcon className="userShowIcon" />
          <span className="userShowInfoTitle">{user.email}</span>
        </div>
        <div className="userShowInfo">
          <LocationSearchingIcon className="userShowIcon" />
          <span className="userShowInfoTitle">New York | USA</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
