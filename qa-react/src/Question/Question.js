import React, { Component } from "react";
import axios from "axios";
import SubmitAnswer from "./SubmitAnswer";
import auth0Client from "../Auth";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const {
      match: { params }
    } = this.props;
    const question = (await axios.get(
      `http://localhost:8081/${params.questionId}`
    )).data;
    this.setState({
      question
    });
  }

  async submitAnswer(answer) {
    await axios.post(
      `http://localhost:8081/answer/${this.state.question.id}`,
      {
        answer
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    await this.refreshQuestion();
  }

  render() {
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer
              questionId={question.id}
              submitAnswer={this.submitAnswer}
            />
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
Here, you can see that you are defining the submitAnswer method that will issue the requests to the backend API (with the user's ID Token) , and that you are defining a method called refreshQuestion . This method will refresh the contents of the question in two situations, on the first time React is rendering this compnent( compnentDidMount ) and righ after the backend API respnd to the POST requestof the submitAnswer method. 

After refractoring the Question component , you will have a complete veresion of your app. To test it, you can go to http://localhost:3000/ and start using your full React app. After singing in , you will be able to ask questions , and you will be able to answer them as well. How cool is taht ?

*/
