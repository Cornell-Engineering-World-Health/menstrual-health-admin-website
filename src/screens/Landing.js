import React from "react";

//AUTH
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="landing-container">
        <div className="sign-in-dropin-wrapper">
          <StyledFirebaseAuth
            uiConfig={this.props.uiConfig}
            firebaseAuth={this.props.firebaseAuth}
          />
        </div>
      </div>
    );
  }
}
