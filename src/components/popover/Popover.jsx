import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import "./popover.css";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { logout } from "../../context/auth/apiCalls";

export default function Dropdown({ children }) {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const logOut = () => {
    localStorage.removeItem("user");
    logout(dispatch);
    history.push("/");
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button {...bindTrigger(popupState)}>{children}</Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box p={2} onClick={logOut}>
              <Typography>
                <ExitToAppIcon className="icon" />
                <span className="text">Sign out</span>
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
