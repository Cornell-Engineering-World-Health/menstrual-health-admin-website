import React from "react";
//PACKAGES
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
//COMPONENTS
import AddBar from "./AddBar.js";

export default class Registration extends React.Component {
  verifyStudent = student => {
    if (
      this.props.students.some(
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
          <AddBar
            submit={this.props.addStudent}
            verifyStudent={this.verifyStudent}
          />
        </div>
        <div className="registration-body">
          <div className="registration-body-title">
            Currently Registered Students
          </div>
          <div className="registration-table">
            <ReactTable
              data={this.props.students}
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
  { Header: "Comments", accessor: "comments" },
  { Header: "Date Registered", accessor: "registered" }
];
