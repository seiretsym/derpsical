import React from "react";

function Nav(props) {
  return (
    <ul className="nav bg-secondary text-light rounded mb-3">
      <li className="nav-item">
        <a className="nav-link text-light" href="./">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="/profile">Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" href="./">Link</a>
      </li>
      <li className="nav-item ml-auto">
        <button className="btn btn-clear nav-link text-light" onClick={() => props.handleLogin()}>Sign In</button>
      </li>
    </ul>
  );
}

export default Nav;