import React, { Component } from "react";
import API from "../utils";
import SongCard from "../components/SongCard";

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
      })
  }

  render() {
    return (
      <div className="bg-secondary text-light rounded p-3" >
        <h1>Latest Songs</h1>
        <div className="d-flex flex-wrap">
          {this.state.songs.map(song => {
            return (
              <SongCard
                title={song.title}
                id={song._id}
                cid={song.composer._id}
                displayname={song.composer.displayname}
                created={song.created}
                key={song.title} />
            )
          })}
        </div>
      </div>
    );
  }
}

export default Main;