import React from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <NavLink to="/" className="navbar-title">Teacher's Portal</NavLink>
        <NavLink to="/generate-script" className="navbar-title">Script</NavLink>
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
