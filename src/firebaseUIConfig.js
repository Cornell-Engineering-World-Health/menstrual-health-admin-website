import firebase from "firebase";
var uiConfig = {
  callbacks: {},
  // Query parameter name for sign in success url.
  queryParameterForSignInSuccessUrl: "signInSuccessUrl",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Whether the display name should be displayed in the Sign Up page.
      requireDisplayName: true
    }
  ],
  // Set to true if you only have a single federated provider like
  // firebase.auth.GoogleAuthProvider.PROVIDER_ID and you would like to
  // immediately redirect to the provider's site instead of showing a
  // 'Sign in with Provider' button first. In order for this to take
  // effect, the signInFlow option must also be set to 'redirect'.
  immediateFederatedRedirect: false,
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign("<your-privacy-policy-url>");
  }
};

export default uiConfig;
