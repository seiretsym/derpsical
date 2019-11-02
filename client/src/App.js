import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/Header"
import Nav from "./components/Nav";
// Pages
import Main from "./pages/Main"
import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
        <div className="container">
          <Header />
          <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
