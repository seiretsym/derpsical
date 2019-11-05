import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SongCard from "../SongCard";
import MsgCard from "../MsgCard";
import API from "../../utils"

class ProfileBody extends Component {
  state = {
    _id: "",
    fullname: "full name",
    displayname: "display name",
    songs: [],
    inbox: [],
    config: [],
    loggedin: false,
    password: "",
    confirm: "",
    profileModalShow: false,
    showReplyModal: false,
    showReplyConfirm: false,
    key: [
      "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "",
    ],
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
        // error handling for display name already in use
        .catch(err => {
          document.getElementById("dname").focus();
          document.getElementById("dname").setAttribute("placeholder", "that display name is already taken");
          this.setState({
            displayname: ""
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
              // error handling for display name already in use
              .catch(err => {
                document.getElementById("dname").focus();
                document.getElementById("dname").setAttribute("placeholder", "that display name is already taken");
                this.setState({
                  displayname: ""
                })
              })
          })
      } else {
        // confirmation fail
        document.getElementById("confirm").focus();
        document.getElementById("confirm").setAttribute("placeholder", "password doesn't match");
        this.setState({
          confirm: ""
        })
      }
    }
  }

  hideProfileModal = () => {
    this.setState({
      profileModalShow: false
    })
  }

  handleConfigSubmit = event => {
    event.preventDefault();

    let keymap = [];
    for (let i = 0; i < 72; i++) {
      let key = document.getElementById("key" + i).value;
      keymap.push(key);
    }
    console.log(keymap)
  }

  handleDelete = id => {
    console.log("delete id: " + id)
  }

  handleReply = id => {
    this.setState({
      showReplyModal: true
    })
    console.log("reply to: " + id)
  }

  hideReplyModal = () => {
    this.setState({
      showReplyModal: false
    })
  }

  hideReplyConfirm = () => {
    this.setState({
      showReplyConfirm: false
    })
  }

  componentDidUpdate() {
    if (this.props.loggedin && !this.state.loggedin) {
      API.getProfile(this.props.profile._id)
        .then(profile => {
          this.setState({
            _id: this.props.profile._id,
            fullname: this.props.profile.fullname,
            displayname: this.props.profile.displayname,
            songs: profile.data[0].songs,
            config: this.props.profile.config,
            inbox: profile.data[0].inbox,
            loggedin: true
          })
          console.log(this.state)
        })
    }
  }

  render() {
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
                  <input id="dname" name="displayname" type="text" className="form-control" value={this.state.displayname} autoComplete="username" onChange={this.handleInputChange} />
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
              centered>
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
            <hr />
            {this.state.inbox.map(message => {
              return (
                <MsgCard
                  message={message.message}
                  sender={message.from.displayname}
                  from={message.from._id}
                  handleReply={this.handleReply}
                  handleDelete={this.handleDelete}
                  id={message._id}
                  key={message._id}
                />
              )
            })}
          </div>
        )
      case "Songs":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Songs</h1>
            <hr />
            <div className="d-flex flex-wrap">
              {this.state.songs.map(song => {
                return (
                  <div>
                    <SongCard
                      title={song.title}
                      id={song._id}
                      cid={song.composer}
                      displayname={this.state.displayname}
                      created={song.created}
                      key={song.title} />
                  </div>
                )
              })}
            </div>
            <Modal
              show={this.state.showReplyModal}
              onHide={this.hideReplyModal}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header className="text-dark" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Send Message
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-dark">
                Message:
                <textarea name="message" rows="3" className="bg-secondary rounded text-light" val={this.state.message} onChange={this.handleInputChange}></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleReply} className="btn-dark">Reply</Button>
                <Button onClick={this.hideReplyModal} className="btn-dark">Close</Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={this.state.showReplyConfirm}
              onHide={this.hideReplyConfirm}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
              <Modal.Header className="text-dark" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Reply Sent!
                </Modal.Title>
              </Modal.Header>
            </Modal>
          </div>
        )
      case "Config":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Keyboard Keymapping</h1>
            <hr />
            <form>
              {this.state.key.map((key, index) => {
                let octave = 3 + Math.floor((index / 12));
                let keyid = "key" + index;
                let note = index % 12;
                switch (note) {
                  case 0:
                    if (octave === 3) {
                      return (
                        <span>
                          <label className="mr-3" key={"octave" + octave}>3rd Octave:</label>
                          <input id={keyid} type="text" className="configKeys" placeholder={"c" + octave} key={keyid} />
                        </span>
                      )
                    } else {
                      return (
                        <span>
                          <label className="mr-3" key={"octave" + octave}>{octave}th Octave:</label>
                          <input id={keyid} type="text" className="configKeys" placeholder={"c" + octave} key={keyid} />
                        </span>
                      )
                    }
                  case 1:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"c#" + octave} key={keyid} />
                  case 2:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"d" + octave} key={keyid} />
                  case 3:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"d#" + octave} key={keyid} />
                  case 4:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"e" + octave} key={keyid} />
                  case 5:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"f" + octave} key={keyid} />
                  case 6:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"f#" + octave} key={keyid} />
                  case 7:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"g" + octave} key={keyid} />
                  case 8:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"g#" + octave} key={keyid} />
                  case 9:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"a" + octave} key={keyid} />
                  case 10:
                    return <input id={keyid} type="text" className="configKeys" placeholder={"a#" + octave} key={keyid} />
                  case 11:
                    return (
                      <span>
                        <input id={keyid} type="text" className="configKeys" placeholder={"b" + octave} key={keyid} />
                        <br />
                      </span>
                    )
                  default:
                    return
                }
              })}
              <hr />
              <input type="submit" className="btn btn-dark" value="Save" onClick={this.handleConfigSubmit} key="submit" />
            </form>

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
