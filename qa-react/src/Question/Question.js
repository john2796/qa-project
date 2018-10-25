import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null
    };
  }

  async componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const question = (await axios.get(
      `http://localhost:8081/${params.questionId}`
    )).data;
    this.setState({
      question
    });
    //console.log(this.props);
  }

  render() {
    const { question } = this.state;
    if (question === null) return <Spinner />;

    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <p>Answers:</p>
            {question.answers.map((answer, idx) => (
              <p className="lead" key={idx}>
                {answer.answer}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;

/* 
Summary 
This works very similar the way the Questions component works. This is a statefull compnent that uses Axios to issue a GET request to the endpoints that retrieves the whole detailsof question, and that updates the page whenever it gets a response back . 

*/
