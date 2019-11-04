import React, { Component } from "react";
import API from "../utils";
import Moment from "react-moment";

class Main extends Component {
  state = {
    show: false,
    songs: []
  }

  componentDidMount() {
    API.findRecent()
      .then(songs => {
        this.setState({
          songs: songs.data
        })
        console.log(songs)
      })
  }

  listSongs = () => {

  }

  render() {
    return (
      <div className="bg-secondary text-light rounded p-3" >
        <h1>Latest Songs</h1>
        <div className="d-flex flex-wrap">
          {this.state.songs.map(song => {
            return (
              <div className="card bg-dark text-light mb-3 mx-3 p-3 card-song">
                <div className="card-title">
                  <a href={"../songs/" + song._id}>
                    <img src="../../../logo256.png" />
                  </a>
                </div>
                <div className="card-body m-0 p-0">
                  <strong><a href={"../songs/" + song._id} className="text-light">{song.title}</a></strong><br />
                  by <a href={"../users/" + song.composer._id} className="text-light">{song.composer.displayname}</a><br />
                  Derped @ <Moment format="MM/DD/YYYY - h:mma">{song.created}</Moment>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Main;