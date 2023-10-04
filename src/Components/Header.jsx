import "../App.css";
import { users } from "../data/users.jsx";
import { useLayoutEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function getInitials(name) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
}

export default function Header() {
  const [open, setOpen] = useState(true);
  return (
    <header className="appHeader">
      {users.map((user) => (
        <div key={user.id} className="headerContainer">
          <div className="headerLoginBar">
            <div className="greetMsgContainer">
              <span className="userInitials">{getInitials(user.name)}</span>
              <span> Hi {user.name.split(" ")[0]}</span>
              <MdKeyboardArrowDown  className="menuArrowBtn" onClick={() => setOpen((prev) => !prev)} />
              {open ? (
                <ul className="userMenu">
                  <li>Settings</li> <li>Logout</li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className="userInfo">
            <img src={user.img} alt={user.name} className="profileImg" />
            <h2>{user.name}</h2>
          </div>
        </div>
      ))}
    </header>
  );
}
