import React from "react";

//AUTH
import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";
import firebaseUIConfig from "./firebaseUIConfig.js";
//COMPONENTS

//SCREENS
import Landing from "./screens/Landing.js";
import Home from "./screens/Home.js";
//STYLES
import "./App.css";
import "./assets/styles/styles.css";

import { getUser, postUser } from "./client/client.js";

//Connect to our firebase instance
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      students: []
    };

    //Callback after you sign in successfully
    firebaseUIConfig.callbacks.signInSuccessWithAuthResult = (
      authResult,
      redirectUrl
    ) => {
      var user = authResult.user;

      //RETRIEVE INFORMATION ABOUT USER HERE, OR REGISTER USER IN DB

      this.setState({ isAuthenticated: true, user: user });

      //Avoid redirects after signing in successfully
      return false;
    };
  }

  addStudent = async student => {
    this.state.students.push(student);
    let formattedStudent = {
      first_name: student.firstName,
      last_name: student.lastName,
      village_name: student.villageName,
      comments: student.comments
    };
    console.log(formattedStudent);
    //await postUser(formattedStudent);
    let newData = JSON.parse(JSON.stringify(this.state.students));
    this.setState({ students: newData });
  };

  async componentDidMount() {
    //when page loads, see if there is an already logged in user. If so, log them in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({
          isAuthenticated: true,
          user: user,
          isAuthenticating: false
        });
      } else {
        this.setState({ isAuthenticating: false });
      }
    });
  }

  /*
    Renders the screen that appears when a person has not logged in yet (Landing Page)
  */
  renderLanding() {
    return (
      <Landing uiConfig={firebaseUIConfig} firebaseAuth={firebase.auth()} />
    );
  }

  /*
  Log out of account and return to landing page
  */
  signOut = () => {
    firebase.auth().signOut();
    this.setState({ isAuthenticated: false });
  };

  /*
    Render the home screen, which is only visible if the user has succesfully
    registered.
  */
  renderHome() {
    return (
      <Home
        signOut={this.signOut}
        user={this.state.user}
        addStudent={this.addStudent}
        students={this.state.students}
      />
    );
  }

  render() {
    if (this.state.isAuthenticating) return null;

    return this.state.isAuthenticated
      ? this.renderHome()
      : this.renderLanding();
  }
}
