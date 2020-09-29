var options = require("./key.json");
var endpoint_prefix = "https://menstralhealthgameserver.herokuapp.com/api/";

// Interval Key Retrieval (60 min)

const {
  dynamic: { setIntervalAsync: setIntervalAsyncD },
} = require("set-interval-async");
var auth_key = "";
var getKeyInterval = setIntervalAsyncD(async () => {
  console.log("GETTING AUTH KEY");
  auth_key = await getKey();
}, 300000);

export async function getKey() {
  let endpoint = options.url;
  options.body = JSON.stringify(options.body);
  const response = await fetch(endpoint, options);
  var res = await response.json();
  var token = res.token_type + " " + res.access_token;
  return token;
}

export async function getUsersByAdmin(admin_id) {
  //make call to database
  auth_key = await getKey();
  let endpoint = endpoint_prefix + "users/admin/" + admin_id;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: auth_key,
    },
  });
  var json = await response.json();
  return json ? json : "";
}

export async function postUser(data) {
  //make call to database
  let endpoint = endpoint_prefix + "users";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth_key,
    },
    body: JSON.stringify(data),
  });
  var json = await response.json();
  return json;
}

export async function deleteUser(user_id) {
  //make call to database
  let endpoint = endpoint_prefix + "users/" + user_id;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: auth_key,
    },
  });
  var json = await response.json();
  return json;
}
