import React, { Component } from "react";
import API from "../utils";
import SongCard from "../components/SongCard";

class Main extends Component {
  state = {
    show: false,
    songs: [],
    pages: [],
    pageViews: [],
    currentPage: 0,
  }

  componentDidMount() {
    this.listSongs("created")
  }

  // get songs
  listSongs = sortMethod => {
    API.findAndSortBy(sortMethod)
      .then(songs => {
        this.setState({
          songs: songs.data
        })
        this.setupView();
      })
  }

  // setup each page view
  setupView = () => {
    let pages = Math.ceil(this.state.songs.length / 6)
    let pageNav = [];
    let songs = [];
    for (let p = 0; p < pages; p++) {
      pageNav.push(
        <li className="page-item" key={p}>
          <button name={p} className="page-link bg-dark text-light py-2 px-3" onClick={this.changePage}>{p}</button>
        </li>
      )
      let subSongs = [];
      for (let s = p * 6; s < (p * 6) + 6; s++) {
        if (this.state.songs[s]) {
          subSongs.push(
            <SongCard
              title={this.state.songs[s].title}
              id={this.state.songs[s]._id}
              cid={this.state.songs[s].composer._id}
              displayname={this.state.songs[s].composer.displayname}
              created={this.state.songs[s].created}
              key={this.state.songs[s].title} />
          )
        }
      }
      songs.push(subSongs)
    }
    this.setState({
      pages: pageNav,
      pageViews: songs
    })
  }

  // change page view
  changePage = event => {
    const { name } = event.target;

    document.getElementById(this.state.currentPage).classList.remove("d-flex");
    document.getElementById(this.state.currentPage).classList.remove("flex-wrap");
    document.getElementById(this.state.currentPage).classList.add("d-none");
    document.getElementById(name).classList.remove("d-none");
    document.getElementById(name).classList.add("d-flex");
    document.getElementById(name).classList.add("flex-wrap");
    this.setState({
      currentPage: name
    })
  }

  render() {
    return (
      <div className="bg-secondary text-light rounded p-3" >
        <h1 className="m-0">Songs</h1>
        <div className="nav m-0">
          Sort by:
          <button name="title" className="btn btn-clear text-light m-0 p-0 ml-3" onClick={() => this.listSongs("title")}>Title</button>
          <button name="composer" className="btn btn-clear text-light m-0 p-0 ml-3 " onClick={() => this.listSongs("composer")}>Composer</button>
          <button name="created" className="btn btn-clear text-light m-0 p-0 ml-3" onClick={() => this.listSongs("created")}>Recent</button>
        </div>
        <hr />
        <ul className="pagination">
          {this.state.pages.map(page => {
            return page
          })}
        </ul>
        <div className="page-container">
          {this.state.pageViews.map((pageView, index) => {
            if (index === 0) {
              return (
                <div id={index} className="d-flex flex-wrap" key={index}>
                  {pageView.map(song => {
                    return song
                  })}
                </div>
              )
            } else {
              return (
                <div id={index} className="d-none" key={index}>
                  {pageView.map(song => {
                    return song
                  })}
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}

export default Main;