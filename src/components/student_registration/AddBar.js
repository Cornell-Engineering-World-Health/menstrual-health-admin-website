import React from "react";
import ReactTooltip from "react-tooltip";

var regex = RegExp("^[0-9]*$");

export default class AddBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      comments: ""
    };
    this.state.tooltip = this.generateTooltip();
  }

  handleChange = (target, event) => {
    this.setState(
      {
        [target]: event.target.value
      },
      () => this.setState({ tooltip: this.generateTooltip() })
    );
  };

  submit = () => {
    //tooltip = error message, so we don't want to submit if there is an error
    if (this.state.tooltip != null) return false;

    this.props.submit(this.state);
    this.setState(
      {
        firstName: "",
        lastName: "",
        age: "",
        comments: ""
      },
      () => this.setState({ tooltip: this.generateTooltip() })
    );
  };

  generateTooltip() {
    //check if fields are missing
    let tooltip = "Missing: ";
    if (this.state.firstName === "" && this.state.lastName === "")
      return (tooltip += "first name, last name");
    if (this.state.lastName === "") return (tooltip += "last name");
    if (this.state.firstName === "") return (tooltip += "first name");

    //check if age is a decimal
    if (!regex.test(this.state.age)) return "Invalid age";

    //check if student is valid
    let errorMessage = this.props.verifyStudent(this.state);
    return errorMessage;
  }

  render() {
    console.log(this.state);
    return (
      <div className="addbar-container">
        <Form
          handleChange={event => this.handleChange("firstName", event)}
          value={this.state.firstName}
          placeholder={"First Name"}
          className={"medium-form"}
          type="text"
        />
        <Form
          handleChange={event => this.handleChange("lastName", event)}
          value={this.state.lastName}
          placeholder={"Last Name"}
          className={"medium-form"}
          type="text"
        />
        <Form
          handleChange={event => this.handleChange("age", event)}
          value={this.state.age}
          placeholder={"Age"}
          className={"small-form"}
          type="number"
          onKeyDown={evt => evt.key === "e" && evt.preventDefault()}
        />
        <Form
          handleChange={event => this.handleChange("comments", event)}
          value={this.state.comments}
          placeholder={"Comments"}
          className={"large-form"}
          type="text"
        />
        <div
          className={
            "addbar-submit-button " +
            (!this.state.tooltip
              ? "addbar-submit-enabled"
              : "addbar-submit-not-enabled")
          }
          onClick={this.submit}
          data-tip={this.state.tooltip}
        >
          Register
        </div>
        {this.state.errorMessage ? (
          <div className="addbar-error-message">{this.state.errorMessage}</div>
        ) : null}
        <ReactTooltip place="right" type="error" effect="solid" />
      </div>
    );
  }
}

const Form = props => {
  return (
    <form
      className={props.className}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <label>
        <input
          type={props.type}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          onKeyDown={props.onKeyDown}
        />
      </label>
    </form>
  );
};
