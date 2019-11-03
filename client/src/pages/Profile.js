import React, { Component } from "react";
import ProfileNav from "../components/ProfileNav"
import ProfileBody from "../components/ProfileBody"

class Profile extends Component {
  state = {
    view: "Profile",
    links: [
      { name: "Profile" },
      { name: "Messages" },
      { name: "Songs" },
      { name: "Config" },
    ]
  }

  handleProfileLinkOnClick = link => {
    this.setState({
      view: link
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-0">
          <ProfileNav links={this.state.links} handleClick={this.handleProfileLinkOnClick} active={this.state.view} />
        </div>
        <div className="col-md m-0 pl-0">
          <ProfileBody view={this.state.view} profile={this.props.profile} loggedin={this.props.loggedin} />
        </div>
      </div>
    )
  }
}


export default Profile;
