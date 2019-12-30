import React from "react";
//PACKAGES
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
//COMPONENTS
import AddBar from "./AddBar.js";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [] //TODO: RETRIEVE STUDENTS FROM DB
    };
  }

  addStudent = student => {
    /*need to create new object that contains all the students to let react know
    we updated this.state.students (react checks objects by ID, so editing the
    existing object does not give it a new id)*/

    //TODO: ADD STUDENT TO DB

    this.state.students.push(student);
    let newData = JSON.parse(JSON.stringify(this.state.students));
    this.setState({ students: newData });
  };

  verifyStudent = student => {
    if (
      this.state.students.some(
        e =>
          e.firstName === student.firstName && e.lastName === student.lastName
      )
    ) {
      //someone is trying to add a duplicate student
      return "You can't add two students with the same name!";
    }
    return null;
  };

  render() {
    return (
      <div className="registration-container">
        <div className="registration-header">
          Add New Student
          <AddBar submit={this.addStudent} verifyStudent={this.verifyStudent} />
        </div>
        <div className="registration-body">
          <div className="registration-body-title">
            Currently Registered Students
          </div>
          <div className="registration-table">
            <ReactTable
              data={this.state.students}
              columns={columns}
              minRows={1}
              showPagination={false}
              NoDataComponent={() => null}
            />
          </div>
        </div>
      </div>
    );
  }
}

const columns = [
  { Header: "First Name", accessor: "firstName" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "Age", accessor: "age" },
  { Header: "Comments", accessor: "comments" }
];
