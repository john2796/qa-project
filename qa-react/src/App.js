import React, { Component } from "react";
import { Route } from "react-router-dom";
import Question from "./Question/Question";
import Questions from "./Questions/Questions";
import Navbar from "./Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/question/:questionId" component={Question} />
      </div>
    );
  }
}

export default App;
