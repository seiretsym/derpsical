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
    modalShow: false,
    user: "",
  }

  handleUser = user => {
    this.setState({ user: user })
  }
  setModalShow = bool => {
    this.setState({ modalShow: bool })
  }

  render() {
    return (
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <Router>
            <div className="container">
              <Header />
              <Nav handleLogin={() => this.setModalShow(true)} />
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
              <LoginModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                user={() => this.handleUser}
              />
            </div>
          </Router>
        )}
      </DimensionsProvider>
    );
  }
}



export default App;
