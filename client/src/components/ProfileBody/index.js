import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import API from "../../utils"

class ProfileBody extends Component {
  state = {
    _id: "",
    fullname: "full name",
    displayname: "display name",
    songs: [],
    messages: [],
    config: [],
    loggedin: false,
    password: "",
    confirm: "",
    profileModalShow: false,
  }

  // handle input changes
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleProfileUpdate = event => {
    event.preventDefault()
    // validations
    if (this.state.password === "") {
      // update profile
      let data = {
        fullname: this.state.fullname,
        displayname: this.state.displayname
      }
      API.updateProfile(this.state._id, data)
        .then(update => {
          // update state
          this.setState({
            fullname: update.data.fullname,
            displayname: update.data.displayname,
            profileModalShow: true
          })
        })
    } else {
      // if password was updated, check if it matches confirm
      if (this.state.password === this.state.confirm) {
        // process password change
        let query = {
          username: sessionStorage.getItem("user"),
          password: sessionStorage.getItem("hash"),
        }
        let data = {
          fullname: this.state.fullname,
          displayname: this.state.displayname
        }
        API.updatePassword(query, this.state.password)
          .then(update => {
            sessionStorage.setItem("hash", update.data)
            // then process profile update
            API.updateProfile(this.state._id, data)
              .then(update => {
                // update state
                this.setState({
                  fullname: update.data.fullname,
                  displayname: update.data.displayname,
                  password: "",
                  confirm: "",
                  profileModalShow: true
                })
              })
          })
      } else {
        // confirmation fail
        document.getElementById("confirm").focus()
        document.getElementById("confirm").setAttribute("value", "")
        document.getElementById("confirm").setAttribute("placeholder", "password doesn't match")
      }
    }
  }

  hideProfileModal = () => {
    this.setState({
      profileModalShow: false
    })
  }

  render() {
    if (this.props.loggedin && !this.state.loggedin) {
      this.setState({
        _id: this.props.profile._id,
        fullname: this.props.profile.fullname,
        displayname: this.props.profile.displayname,
        songs: this.props.profile.songs,
        messages: this.props.profile.messages,
        config: this.props.profile.config,
        loggedin: true
      })
    }

    switch (this.props.view) {
      case "Profile":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Profile Settings</h1>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                  <input name="fullname" type="text" className="form-control" value={this.state.fullname} autoComplete="name" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Display Name</label>
                <div className="col-sm-10">
                  <input name="displayname" type="text" className="form-control" value={this.state.displayname} autoComplete="username" onChange={this.handleInputChange} />
                </div>
              </div>
              <hr />
              <h1>Change Password</h1>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input name="password" type="password" className="form-control" value={this.state.password} placeholder="new password" autoComplete="new-password" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Confirm</label>
                <div className="col-sm-10">
                  <input name="confirm" id="confirm" type="password" className="form-control" value={this.state.confirm} placeholder="confirm password" autoComplete="password-confirm" onChange={this.handleInputChange} />
                </div>
              </div>
              <hr />
              <input type="submit" className="btn btn-submit btn-dark" value="Save" onClick={this.handleProfileUpdate}></input>
            </form>

            <Modal
              show={this.state.profileModalShow}
              onHide={this.hideProfileModal}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header className="text-dark" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Profile Updated!
                </Modal.Title>
              </Modal.Header>
            </Modal>
          </div>
        )
      case "Messages":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Messages</h1>
            <p>
              Consectetur eu velit nulla ullamco. Nulla dolore irure cillum nostrud cillum esse ipsum ut commodo qui adipisicing duis. Fugiat sit cupidatat ipsum tempor tempor sunt.
            </p>
          </div>
        )
      case "Songs":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Songs</h1>
            <p>
              Commodo pariatur et quis commodo fugiat eiusmod aliqua cillum consectetur. Laboris amet cillum laborum laborum sunt incididunt cupidatat Lorem amet excepteur dolore ipsum. Elit eiusmod ea anim culpa nisi enim deserunt ad ex reprehenderit. Quis Lorem Lorem ipsum sit adipisicing mollit.
            </p>
          </div>
        )
      case "Config":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Config</h1>
            <p>
              Dolor anim do tempor dolore incididunt consectetur id exercitation consectetur. Irure ullamco ad sit laboris nisi proident et cillum qui id aute incididunt. Labore nostrud deserunt pariatur nisi cupidatat sint irure ipsum exercitation duis do eu est. Ea incididunt eiusmod aliqua ipsum incididunt incididunt consectetur exercitation enim laborum aliquip. Enim cupidatat quis dolor quis velit veniam sit excepteur nisi proident. Dolore reprehenderit minim et exercitation commodo esse nulla. Magna quis tempor duis tempor sint incididunt voluptate dolore eu.
            </p>
          </div>
        )
      default:
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Default</h1>
            <p>If you somehow got here, you should talk to Kevin.</p>
          </div>
        )
    }
  }
}

export default ProfileBody;
