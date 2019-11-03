import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/Header"
import Nav from "./components/Nav";
import DimensionsProvider from "./components/DimensionsProvider";
// Pages
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import LoginModal from "./components/LoginModal"

class App extends Component {
  state = {
    login: false,
    modalShow: false,
    user: "No User",
  }

  handleUser = user => {
    if (!this.state.login) {
      this.setState({
        user: user,
        login: true,
        modalShow: false
      })
    }
  }

  setModalShow = bool => {
    this.setState({ modalShow: bool })
  }

  handleLogout = () => {
    sessionStorage.removeItem("user");
    this.setState({
      login: false,
      user: "No User",
    })
  }
  render() {
    let user = sessionStorage.getItem("user");
    if (user && !this.state.login) {
      this.setState({
        login: true,
        user: user
      })
    }

    return (
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <Router>
            <div className="container">
              <Header />
              <Nav login={this.state.login} user={this.state.user} handleLogin={() => this.setModalShow(true)} handleLogout={this.handleLogout} />
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
              <LoginModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                user={this.handleUser}
              />
            </div>
          </Router>
        )}
      </DimensionsProvider>
    );
  }
}



export default App;
