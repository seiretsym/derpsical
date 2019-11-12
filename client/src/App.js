import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/Header";
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal";
// Pages
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Demo from "./pages/Demo";
import Editor from "./pages/Editor";
import Composer from "./pages/Composer";
import Player from "./pages/Player";
import User from "./pages/User";
// Utility
import API from "./utils";
// Css
import './App.css';


class App extends Component {
  state = {
    login: false,
    modalShow: false,
    profile: {
      displayname: "No User"
    }
  }

  // update state to fill with user data after sign in
  handleUser = user => {
    if (!this.state.login) {
      this.setState({
        login: true,
        modalShow: false,
        profile: user
      })
    }
  }

  // login modal toggler
  setModalShow = bool => {
    this.setState({ modalShow: bool })
  };

  handleLogout = () => {
    // remove data stored in session storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("hash");
    // set state back to default
    this.setState({
      login: false,
      profile: {
        displayname: "No User"
      }
    });
    document.location.replace("./");
  }

  // auto sign in
  autoSignIn = user => {
    API.getUser(user).then(profile => {
      // if user successfully logs in...
      if (profile.data) {
        this.setState({
          login: true,
          profile: profile.data.profile
        })
      } else {
        // if not.. remove the sessionStorage data to prevent abuse
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("hash");
        sessionStorage.removeItem("auto");
      }
    }).catch(err => {
      console.log("Attempt to auto sign-in with no data");
    })
  }

  render() {
    let user = {
      username: sessionStorage.getItem("user"),
      password: sessionStorage.getItem("hash"),
      auto: sessionStorage.getItem("auto")
    };
    if (user.auto && !this.state.login) {
      this.autoSignIn(user)
    };

    return (
      <div className="container">
        <Header />
        <Nav login={this.state.login} user={this.state.profile.displayname} handleLogin={() => this.setModalShow(true)} handleLogout={this.handleLogout} />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/demo" component={Demo} />
            <Route exact path="/profile" render={() => <Profile profile={this.state.profile} loggedin={this.state.login} />}>
              <Route path="/:id" render={(props) => <User loggedin={this.state.login} uid={this.state.profile._id} {...props} />} />
            </Route>
            <Route exact path="/composer" render={() => <Composer profile={this.state.profile} loggedin={this.state.login} />}>
              <Route path="/:id" render={(props) => <Editor {...props} />} />
            </Route>
            <Route exact path="/songs/:id" render={(props) => <Player {...props} />} />
            <Route component={Main} />
          </Switch>
        </Router>
        <LoginModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        />
      </div>
    );
  };
};

export default App;
