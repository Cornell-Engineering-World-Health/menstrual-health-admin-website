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

import { getUsersByAdmin, postUser, postAdmin, getUser } from "./client/client.js";


//Connect to our firebase instance
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      students: [],
      locked: false
    };

    //Callback after you sign in successfully

    firebaseUIConfig.callbacks.signInSuccessWithAuthResult = async (
      authResult,
      redirectUrl
    ) => {
      var admin = authResult.user;

      /*
      let students = await getUsersByAdmin('5e627a6492084a000442e6c0');
      for(let s in students) {
        let formattedStudent = {
          firstName: students[s].first_name,
          lastName: students[s].last_name,
          villageName: students[s].village_name,
          comments: students[s].comments,
        }
        this.state.students.push(formattedStudent);
      }
      */
      console.log('admin', admin);

      //RETRIEVE INFORMATION ABOUT USERS BY ADMIN HERE, OR REGISTER USER IN DB
      //students = JSON.parse(JSON.stringify(this.state.students));
      this.setState({ isAuthenticated: true, user: admin, students: []});
      //console.log(students)
      //Avoid redirects after signing in successfully
      return false;
    };
  }

  addStudent = async student => {
    console.log('aIn')
    console.log('a', this.state.locked)
    //this.setState({locked: true });
    this.state.students.push(student);
    let formattedStudent = {
      first_name: student.firstName,
      last_name: student.lastName,
      village_name: student.villageName,
      comments: student.comments,
      admin_id: '5e627a6492084a000442e6c0',
    };
    //console.log(this.state.students);
    this.setState({locked: true });
    await postUser(formattedStudent);
    this.setState({locked: false });
    let newData = JSON.parse(JSON.stringify(this.state.students));
    this.setState({ students: newData, locked: false });
    console.log('aOut')

  }

  async componentDidMount() {
    //when page loads, see if there is an already logged in user. If so, log them in
    firebase.auth().onAuthStateChanged(async user => {
      console.log('m', this.state.locked)
      if (user && !this.state.locked) {
        console.log('mIn')
        this.setState({ locked: true });
        this.state.students = await getStudents('5e627a6492084a000442e6c0');
        this.setState({ locked: true });
        console.log('mOut')
        let students = JSON.parse(JSON.stringify(this.state.students));
        // User is signed in.
        //console.log(state.students)
        this.setState({
          isAuthenticated: true,
          user: user,
          isAuthenticating: false,
          students: students,
          locked: false
        });
      } else {
        this.setState({ isAuthenticating: false });
      }
    });
    //console.log(await getUser('5e64281d7bc8d60004846437'))
    //console.log(await getUsersByAdmin('5e627a6492084a000442e6c0'));
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

async function getStudents(admin_id) {
  let students = await getUsersByAdmin(admin_id);
  let state_students = []
  for(let s in students) {
    let formattedStudent = {
      firstName: students[s].first_name,
      lastName: students[s].last_name,
      villageName: students[s].village_name,
      comments: students[s].comments,
    }
    state_students.push(formattedStudent)
    //this.state.students.push(formattedStudent);
  }
  return state_students
};
