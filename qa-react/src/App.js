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

/* 
Summary 
You are using two Routes component ( Provided by react-router-dom) to tell React when you want the Questions component rendered and when you want the Question component rendered. More specifically, you are telling  React that if your users navigate to / ( exact path='/')
you want them to see Questions and if, they navigate to /question/:questionId, you want them see the details of a specifc question.

Note that the last route defines a paramter called questionId. When you created the Questions
(plural) compnent, you added a link that uses the id of the question. React Router uses this id to form the link and then gives it to your Question component (params.questionId) with this id, you compnoent uses Axios to tell the backend what question exactly is being requested.


*/
