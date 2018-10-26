import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null
    };
  }

  async componentDidMount() {
    const questions = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      questions
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mg-3">
              <div className="card-header">Need help? Ask here!</div>
              <div className="card-body">
                <h4 className="card-title">+ New Question</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {/* <!-- loading questions message ... --> */}
          {this.state.questions === null && <Spinner />}
          {/* <!-- ... questions' cards ... --> */}
          {this.state.questions &&
            this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                      Answers: {question.answers}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Questions;

/* 
Summary 
First you are createing a stateful componenet that will hold the question available in your backend API . set state to question = null; and when React finishes mountaing your component ( which will triggers the componentDidMount) ,you are issuing a GET request (through axios.get)
in the meantime between your request and response it will load a message saying "loading questions ... " 

Then whenever axios gets a response from the backend , you put the data returned inside a constant called question . and you update the state . this update will trigger a re-render and makes React show all the question retrieved.

Besides that note that you are using component called LInk to make this redirect user to the following path when clicked :/question${question.id} .

*/
