import React, { Component } from "react";

class Nav extends Component {

  button = () => {
    if (this.props.login) {
      return (
        <div className="btn-group">
          <span className="nav-link mr-0 px-0">Welcome, {this.props.user}</span>
          <button className="btn btn-clear dropdown-toggle dropdown-toggle-split text-light ml-0" data-toggle="dropdown">
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/profile">Profile</a>
            <a className="dropdown-item" href="/songs">Songs</a>
            <a className="dropdown-item" href="/piano">Piano</a>
            <div className="dropdown-divider"></div>
            <button className="btn btn-clear dropdown-item" onClick={() => this.props.handleLogout()}>Sign Out</button>
          </div>
        </div>
      )
    } else {
      return <button className="btn btn-clear nav-link text-light" onClick={() => this.props.handleLogin()}>Sign In</button>
    }
  }

  render() {

    return (
      <ul className="nav bg-secondary text-light rounded mb-3">
        <li className="nav-item">
          <a className="nav-link text-light" href="./">Home</a>
        </li>
        <li className="nav-item ml-auto">
          {this.button()}
        </li>
      </ul>
    );
  }
}

export default Nav;