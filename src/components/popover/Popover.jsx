import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import "./popover.css";
import { useState } from "react";

export default function Dropdown({ children }) {
  const [foo, setFoo] = useState(false);
  const logout = () => {
    localStorage.removeItem("user");
    setFoo(true);
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
            <Box p={2} onClick={logout()}>
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
