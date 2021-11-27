import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
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
          <PermIdentity className="userShowIcon" />
          <span className="userShowInfoTitle">{user.username}</span>
        </div>
        <div className="userShowInfo">
          <CalendarToday className="userShowIcon" />
          <span className="userShowInfoTitle">10.12.1999</span>
        </div>
        <span className="userShowTitle">Contact Details</span>
        <div className="userShowInfo">
          <PhoneAndroid className="userShowIcon" />
          <span className="userShowInfoTitle">+1 123 456 67</span>
        </div>
        <div className="userShowInfo">
          <MailOutline className="userShowIcon" />
          <span className="userShowInfoTitle">{user.email}</span>
        </div>
        <div className="userShowInfo">
          <LocationSearching className="userShowIcon" />
          <span className="userShowInfoTitle">New York | USA</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
