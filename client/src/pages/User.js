import React, { Component } from "react";
import API from "../utils";
import SongCard from "../components/SongCard";

class User extends Component {

  state = {
    uid: this.props.uid,
    profile: {
      songs: [],
    },
    loggedin: false,
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
    console.log(this.state)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3 bg-secondary p-3 mx-3 rounded text-center">
          <img src="../../profile.png" className="img-fluid" />
          <h5>{this.state.profile.displayname}</h5>
          <hr />
          <div className="text-left">
            <button className="btn btn-clear text-light" onClick={this.handleMessage}>Send Message</button>
          </div>
        </div>
        <div className="col-md bg-secondary p-3 mx-3 rounded">
          <h1>Songs</h1>
          <hr />
          <div className="d-flex flex-wrap profile-song-list overflow-auto">
            {this.state.profile.songs.map(song => {
              return (
                <SongCard
                  title={song.title}
                  id={song._id}
                  cid={song.composer._id}
                  displayname={this.state.profile.displayname}
                  created={song.created}
                  key={song.title} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}

export default User