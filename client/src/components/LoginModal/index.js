import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import API from "../../utils";

class LoginModal extends Component {
  state = {
    process: "Sign In",
    username: "",
    usernameph: "username",
    password: "",
    passwordph: "password",
    confirm: "",
    confirmph: "confirm",
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    // alphanumeric only
    value = value.replace(/[\W_]+/g, "");
    // update state
    this.setState({
      [name]: value
    })
  }

  modalContent = process => {
    switch (process) {
      // show sign in elements
      case "Sign In":
        return (
          <form>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={this.state.username} id="username" type="text" className="form-control" placeholder={this.state.usernameph} autoComplete="username" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" value={this.state.password} id="password" type="password" className="form-control" placeholder={this.state.passwordph} autoComplete="password" onChange={this.handleInputChange} />
            </div>
            <strong>Click Sign In Button to Sign In</strong>
          </form>
        )
      // show register elements
      case "Register":
        return (
          <form>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={this.state.username} id="username" type="text" className="form-control" placeholder={this.state.usernameph} autoComplete="username" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" value={this.state.password} id="password" type="password" className="form-control" placeholder={this.state.passwordph} autoComplete="password" onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Confirm</label>
              <input name="confirm" value={this.state.confirm} id="confirm" type="password" className="form-control" placeholder={this.state.confirmph} autoComplete="password-confirm" onChange={this.handleInputChange} />
            </div>
            <strong>Click Register Button to Register</strong>
          </form>
        )
      default:
        // this should never happen,  but if it does...
        return (
          <div>you should never see this, but blame kevin if you do</div>
        )
    }
  }

  signIn = () => {
    // check current state process
    if (this.state.process !== "Sign In") {
      // change to sign in if it isn't already at sign in
      this.setState({ process: "Sign In" })
    } else {
      // validate form inputs
      if (this.state.username === "") {
        console.log("blank username")
        document.getElementById("username").focus();
        this.setState({ usernameph: "this cannot be empty!" })
      } else if (this.state.password === "") {
        console.log("blank password")
        document.getElementById("password").focus();
        this.setState({ passwordph: "invalid password" })
      } else {
        // process sign in
        console.log("sign in")
        let user = {
          username: this.state.username,
          password: this.state.password
        }
        API.getUser(user).then(profile => {
          if (profile.data) {
            // user signed in, do something...
            sessionStorage.setItem("user", profile.data.username)
            sessionStorage.setItem("hash", profile.data.password)
            sessionStorage.setItem("auto", true)
            document.location.replace("./")
          } else {
            // wrong password
            document.getElementById("password").focus();
            this.setState({ password: "", passwordph: "invalid password" })
          }
        })
      }
    }
  }

  register = () => {
    // check current state process
    if (this.state.process !== "Register") {
      // change to register if it isn't set to register
      this.setState({ process: "Register" })
    } else {
      // validate form inputs
      if (this.state.username === "") {
        console.log("blank username")
        document.getElementById("username").focus();
        this.setState({ usernameph: "this cannot be empty!" })
      } else if (this.state.password === "") {
        console.log("blank password")
        document.getElementById("password").focus();
        this.setState({ passwordph: "invalid password" })
      } else if (this.state.confirm !== this.state.password) {
        console.log("passwords don't match")
        document.getElementById("confirm").focus();
        this.setState({ confirm: "", confirmph: "doesn't match password" })
      } else {
        // process registration
        let user = {
          username: this.state.username,
          password: this.state.password
        }
        API.createUser(user).then(profile => {
          // do something after user registers
          sessionStorage.setItem("user", profile.data.username)
          sessionStorage.setItem("hash", profile.data.password)
          sessionStorage.setItem("auto", true)
          document.location.replace("./")
        }).catch(err => {
          if (err) {
            // username taken!
            document.getElementById("username").focus();
            this.setState({ username: "", usernameph: "username already taken" })
          }
        });
      }
    }
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="text-dark" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.state.process}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          {this.modalContent(this.state.process)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.signIn} className="btn-dark">Sign In</Button>
          <Button onClick={this.register} className="btn-dark">Register</Button>
          <Button onClick={this.props.onHide} className="btn-dark">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LoginModal