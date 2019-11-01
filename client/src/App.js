import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Header from "./components/Header"
import Nav from "./components/Nav";
// Pages
import Main from "./pages/Main"

function App() {
  return (
    <Router>
        <div className="container">
          <Header />
          <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
