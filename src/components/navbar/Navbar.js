import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-title">Teacher's Portal</div>
        <div
          className="navbar-signout"
          onClick={() => {
            this.props.signOut();
          }}
        >
          Sign Out
        </div>
      </div>
    );
  }
}
