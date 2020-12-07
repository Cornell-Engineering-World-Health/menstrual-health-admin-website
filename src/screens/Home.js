import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//COMPONENTS
import Navbar from "../components/navbar/Navbar";
import Registration from "../components/student_registration/Registration";
import { ScriptGenerator } from "../components/script_generator/ScriptGenerator.js";
export default class Home extends React.Component {
  render() {
    //notation passes along all props from the Home component to child components
    return (
      <Router>
        <Navbar {...this.props} />
        <Switch>
          <Route exact path={"/"} render={(props) => <Registration {...this.props} />} />
          <Route path={"/generate-script"} component={ScriptGenerator} />
        </Switch>
      </Router>
    );
  }
}
