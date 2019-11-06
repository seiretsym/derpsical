import React, { Component } from "react";
import API from "../utils";
import SongCard from "../components/SongCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class User extends Component {

  state = {
    uid: this.props.uid,
    profile: {
      songs: [],
    },
    loggedin: false,
    showMessageModal: false,
    message: "",
  }

  componentDidMount() {
    API.getProfile(this.props.match.params.id)
      .then(profile => {
        this.setState({
          profile: profile.data[0]
        })
      })
  }

  componentDidUpdate() {
    if (this.props.loggedin && !this.state.loggedin) {
      this.setState({
        uid: this.props.uid,
        loggedin: true,
      })
    }
  }

  handleMessage = () => {
    if (this.state.loggedin) {
      if (this.state.message.length > 0) {
        let message = {
          to: this.props.match.params.id,
          from: this.state.uid,
          message: this.state.message
        }
        API.sendMessage(message)
          .then(data => {
            this.setState({
              message: ""
            })
            this.hideMessageModal();
            this.showConfirmModal("Message Sent!");
          })
          .catch(err => {
            this.showConfirmModal("There was an error!");
          })
      } else {
        document.getElementById("message").setAttribute("placeholder", "Sending an empty message isn't cute.");
        document.getElementById("message").focus();
      }
    }
  }

  showConfirmModal = string => {
    this.setState({
      showConfirmModal: true,
      confirmMessage: string
    })
  }

  hideConfirmModal = () => {
    this.setState({
      showConfirmModal: false,
      confirmMessage: "",
    })
  }

  showMessageModal = () => {
    this.setState({
      showMessageModal: true,
    })
  }

  hideMessageModal = () => {
    this.setState({
      showMessageModal: false,
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 bg-secondary p-3 mx-3 rounded text-center">
          <img src="../../profile.png" className="img-fluid" alt={this.state.profile.displayname} />
          <h5>{this.state.profile.displayname}</h5>
          <hr />
          <div className="text-left">
            <button className="btn btn-clear text-light" onClick={this.showMessageModal}>Send Message</button>
          </div>
        </div>
        <div className="col-md bg-secondary p-3 mx-3 rounded">
          <h1>Songs</h1>
          <hr />
          <div className="d-flex flex-wrap profile-song-list overflow-auto">
            {this.state.profile.songs.map(song => {
              console.log(song);
              return (
                <SongCard
                  title={song.title}
                  id={song._id}
                  cid={song.composer}
                  displayname={this.state.profile.displayname}
                  created={song.created}
                  key={song.title} />
              )
            })}
          </div>
        </div>
        <Modal
          show={this.state.showMessageModal}
          onHide={this.hideMessageModal}
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
            <textarea id="message" name="message" rows="3" className="bg-dark rounded text-light" val={this.state.message} onChange={this.handleInputChange} placeholder="write your message here..."></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleMessage} className="btn-dark">Send Message</Button>
            <Button onClick={this.hideMessageModal} className="btn-dark">Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showConfirmModal}
          onHide={this.hideConfirmModal}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="text-dark" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.confirmMessage}
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </div>
    )
  }

}

export default User