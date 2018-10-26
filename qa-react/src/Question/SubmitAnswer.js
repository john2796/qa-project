import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../Auth";

class SubmitAnswer extends Component {
  state = {
    answer: ""
  };

  updateAnswer(value) {
    this.setState({ answer: value });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({ answer: "" });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail">Answer:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer}
            onChange={e => {
              this.updateAnswer(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(SubmitAnswer);

/*
Summary
- This component works in a similar fashio to the NewQuestion componnet. The difference here is that intead of handling the POST request by itlsef , the compnent delegates it to someone else. Also , if the user is not authenticated , this compnent renderes nothing 

To use this compnent, open the Quesiton.js file and replace its contens with thisL

*/
