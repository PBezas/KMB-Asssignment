import styles from "./Header.module.css";
import { users } from "../data/users.jsx";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function getInitials(name) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className={styles.appHeader}>
      {users.map((user) => (
        <div key={user.id} className={styles.headerContainer}>
          <div className={styles.headerLoginBar}>
            <div className={styles.greetMsgContainer}>
              <span className={styles.userInitials}>
                {getInitials(user.name)}
              </span>
              <span> Hi {user.name.split(" ")[0]}</span>
              <Button onClick={handleClick} sx={{ color: "white" }}>
                <MdKeyboardArrowDown />
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
          <div
            className={styles.userInfo}
            style={{
              backgroundImage: `url(${user.backImg})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <img
              src={user.profImg}
              alt={user.name}
              className={styles.profileImg}
            />
            <h2>{user.name}</h2>
          </div>
        </div>
      ))}
    </header>
  );
}
