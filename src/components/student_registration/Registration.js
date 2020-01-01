import React from "react";
//PACKAGES
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
//COMPONENTS
import AddBar from "./AddBar.js";

//images
import images from "../../assets/images/images.js";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoOpen: true
    };
  }

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

  toggleInfoSection = () => {
    this.setState({
      isInfoOpen: !this.state.isInfoOpen
    });
  };

  render() {
    //if the user closed the info section, we want to add a new tag to make the height of the info section 0

    let infoClosed = this.state.isInfoOpen
      ? ""
      : " registration-info-section-container-closed";

    return (
      <div className="registration-wrapper">
        <div className="x-button-wrapper">
          <img
            className="x-button"
            src={this.state.isInfoOpen ? images.x : images.info}
            alt="x"
            onClick={this.toggleInfoSection}
          />
        </div>
        <div className={"registration-info-section-container" + infoClosed}>
          <div className="registration-info-section-box">
            <div className="registration-info-section-box-body">
              Register students on this website
            </div>
            <div className="registration-info-section-box-title">1</div>
          </div>
          <div className="registration-info-section-box">
            <div className="registration-info-section-box-body">
              Log into the game on the tablet
            </div>
            <div className="registration-info-section-box-title">2</div>
          </div>
          <div className="registration-info-section-box">
            <div className="registration-info-section-box-body">
              Select from dropdown which student will play on that tablet!
            </div>
            <div className="registration-info-section-box-title">3</div>
          </div>
        </div>
        <div className="registration-container">
          <div className="registration-header">
            <div className="registration-add-student-title">
              Add New Student
            </div>
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
