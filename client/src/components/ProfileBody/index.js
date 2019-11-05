import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import SongCard from "../SongCard";
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

  componentDidUpdate() {
    if (this.props.loggedin && !this.state.loggedin) {
      API.getProfile(this.props.profile._id)
        .then(profile => {
          this.setState({
            _id: this.props.profile._id,
            fullname: this.props.profile.fullname,
            displayname: this.props.profile.displayname,
            songs: profile.data[0].songs,
            messages: this.props.profile.messages,
            config: this.props.profile.config,
            loggedin: true
          })
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
            <hr />
            <div className="d-flex flex-wrap">
              {this.state.songs.map(song => {
                return (
                  <SongCard
                    title={song.title}
                    id={song._id}
                    cid={song.composer}
                    displayname={this.state.displayname}
                    created={song.created}
                    key={song.title} />
                )
              })}
            </div>
          </div>
        )
      case "Config":
        return (
          <div className="bg-secondary rounded p-3">
            <h1>Keyboard Keymapping</h1>
            <hr />
            <form>
              <label className="mr-3">3rd Octave:</label>
              <input id="key0" type="text" className="configKeys" placeholder="c3" />
              <input id="key1" type="text" className="configKeys" placeholder="c#3" />
              <input id="key2" type="text" className="configKeys" placeholder="d3" />
              <input id="key3" type="text" className="configKeys" placeholder="d#3" />
              <input id="key4" type="text" className="configKeys" placeholder="e3" />
              <input id="key5" type="text" className="configKeys" placeholder="f3" />
              <input id="key6" type="text" className="configKeys" placeholder="f#3" />
              <input id="key7" type="text" className="configKeys" placeholder="g3" />
              <input id="key8" type="text" className="configKeys" placeholder="g#3" />
              <input id="key9" type="text" className="configKeys" placeholder="a3" />
              <input id="key10" type="text" className="configKeys" placeholder="a#3" />
              <input id="key11" type="text" className="configKeys" placeholder="b3" />
              <br />
              <label className="mr-3">4th Octave:</label>
              <input id="key12" type="text" className="configKeys" placeholder="c4" />
              <input id="key13" type="text" className="configKeys" placeholder="c#4" />
              <input id="key14" type="text" className="configKeys" placeholder="d4" />
              <input id="key15" type="text" className="configKeys" placeholder="d#4" />
              <input id="key16" type="text" className="configKeys" placeholder="e4" />
              <input id="key17" type="text" className="configKeys" placeholder="f4" />
              <input id="key18" type="text" className="configKeys" placeholder="f#4" />
              <input id="key19" type="text" className="configKeys" placeholder="g4" />
              <input id="key20" type="text" className="configKeys" placeholder="g#4" />
              <input id="key21" type="text" className="configKeys" placeholder="a4" />
              <input id="key22" type="text" className="configKeys" placeholder="a#4" />
              <input id="key23" type="text" className="configKeys" placeholder="b4" />
              <br />
              <label className="mr-3">5th Octave:</label>
              <input id="key24" type="text" className="configKeys" placeholder="c5" />
              <input id="key25" type="text" className="configKeys" placeholder="c#5" />
              <input id="key26" type="text" className="configKeys" placeholder="d5" />
              <input id="key27" type="text" className="configKeys" placeholder="d#5" />
              <input id="key28" type="text" className="configKeys" placeholder="e5" />
              <input id="key29" type="text" className="configKeys" placeholder="f5" />
              <input id="key30" type="text" className="configKeys" placeholder="f#5" />
              <input id="key31" type="text" className="configKeys" placeholder="g5" />
              <input id="key32" type="text" className="configKeys" placeholder="g#5" />
              <input id="key33" type="text" className="configKeys" placeholder="a5" />
              <input id="key34" type="text" className="configKeys" placeholder="a#5" />
              <input id="key35" type="text" className="configKeys" placeholder="b5" />
              <br />
              <label className="mr-3">6th Octave:</label>
              <input id="key36" type="text" className="configKeys" placeholder="c6" />
              <input id="key37" type="text" className="configKeys" placeholder="c#6" />
              <input id="key38" type="text" className="configKeys" placeholder="d6" />
              <input id="key39" type="text" className="configKeys" placeholder="d#6" />
              <input id="key40" type="text" className="configKeys" placeholder="e6" />
              <input id="key41" type="text" className="configKeys" placeholder="f6" />
              <input id="key42" type="text" className="configKeys" placeholder="f#6" />
              <input id="key43" type="text" className="configKeys" placeholder="g6" />
              <input id="key44" type="text" className="configKeys" placeholder="g#6" />
              <input id="key45" type="text" className="configKeys" placeholder="a6" />
              <input id="key46" type="text" className="configKeys" placeholder="a#6" />
              <input id="key47" type="text" className="configKeys" placeholder="b6" />
              <br />
              <label className="mr-3">7th Octave:</label>
              <input id="key48" type="text" className="configKeys" placeholder="c7" />
              <input id="key49" type="text" className="configKeys" placeholder="c#7" />
              <input id="key50" type="text" className="configKeys" placeholder="d7" />
              <input id="key51" type="text" className="configKeys" placeholder="d#7" />
              <input id="key52" type="text" className="configKeys" placeholder="e7" />
              <input id="key53" type="text" className="configKeys" placeholder="f7" />
              <input id="key54" type="text" className="configKeys" placeholder="f#7" />
              <input id="key55" type="text" className="configKeys" placeholder="g7" />
              <input id="key56" type="text" className="configKeys" placeholder="g#7" />
              <input id="key57" type="text" className="configKeys" placeholder="a7" />
              <input id="key58" type="text" className="configKeys" placeholder="a#7" />
              <input id="key59" type="text" className="configKeys" placeholder="b7" />
              <br />
              <label className="mr-3">8th Octave:</label>
              <input id="key60" type="text" className="configKeys" placeholder="c8" />
              <input id="key61" type="text" className="configKeys" placeholder="c#8" />
              <input id="key62" type="text" className="configKeys" placeholder="d8" />
              <input id="key63" type="text" className="configKeys" placeholder="d#8" />
              <input id="key64" type="text" className="configKeys" placeholder="e8" />
              <input id="key65" type="text" className="configKeys" placeholder="f8" />
              <input id="key66" type="text" className="configKeys" placeholder="f#8" />
              <input id="key67" type="text" className="configKeys" placeholder="g8" />
              <input id="key68" type="text" className="configKeys" placeholder="g#8" />
              <input id="key69" type="text" className="configKeys" placeholder="a8" />
              <input id="key70" type="text" className="configKeys" placeholder="a#8" />
              <input id="key71" type="text" className="configKeys" placeholder="b8" />
              <hr />
              <input type="submit" className="btn btn-dark" value="Save" onClick={this.handleConfigSubmit} />
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
