import React from "react";

//COMPONENTS
import Navbar from "../components/navbar/Navbar";
import Registration from "../components/student_registration/Registration";
export default class Home extends React.Component {
  render() {
    //notation passes along all props from the Home component to Navbar
    return (
      <>
        <Navbar {...this.props} />
        <Registration />
      </>
    );
  }
}
