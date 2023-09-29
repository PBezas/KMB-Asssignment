import "../App.css";
import { users } from "../data/users.jsx";

export default function Header() {
  return (
    <header className="header">
      {users.map((user) => (
        <div key={user.id} className="userContainer">
          <img src={user.img} alt={user.name} className="profileImg" />
          <h2>{user.name}</h2>
        </div>
      ))}
    </header>
  );
}
