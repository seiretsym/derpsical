import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/Header"
import Nav from "./components/Nav";
import LoginModal from "./components/LoginModal"
// Pages
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import Demo from "./pages/Demo"
// Utility
import API from "./utils";
// Css
import './App.css';

class App extends Component {
  state = {
    login: false,
    modalShow: false,
    profile: {
      displayname: ""
    }
  }

  handleUser = user => {
    if (!this.state.login) {
      this.setState({
        login: true,
        modalShow: false,
        profile: user
      })
    }
  }

  setModalShow = bool => {
    this.setState({ modalShow: bool })
  }

  handleLogout = () => {
    // remove data stored in session storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("hash");
    // set state back to default
    this.setState({
      login: false,
      profile: {
        displayname: ""
      }
    })
  }

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
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("hash")
        sessionStorage.removeItem("auto")
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    let user = {
      username: sessionStorage.getItem("user"),
      password: sessionStorage.getItem("hash"),
      auto: sessionStorage.getItem("auto")
    }

    if (user && !this.state.login) {
      this.autoSignIn(user)
    }

    return (
      <Router>
        <div className="container">
          <Header />
          <Nav login={this.state.login} user={this.state.profile.displayname} handleLogin={() => this.setModalShow(true)} handleLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/profile" render={() => <Profile profile={this.state.profile} loggedin={this.state.login} />} />
            <Route path="/demo" component={Demo} />
            <Route component={Main} />
          </Switch>
          <LoginModal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            user={this.handleUser}
          />
        </div>
      </Router>
    )
  }
}



export default App;
