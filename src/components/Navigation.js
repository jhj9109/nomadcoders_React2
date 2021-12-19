import React from "react";
import Home from "routes/Home";
import Profile from "routes/Profile";
import { Link } from "react-router-dom";
const Navigation = ({ onLogout }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile">
          Profile
        </Link>
      </li>
      <button onClick={onLogout}>Logout</button>
    </ul>
  </nav>
);

export default Navigation;
