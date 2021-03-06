var endpoint_prefix = "https://healthfriendgameserver.herokuapp.com/api/";

export function getKey() {
  return process.env.REACT_APP_API_KEY;
}

export async function getUsersByAdmin(admin_id) {
  //make call to database
  let endpoint = endpoint_prefix + "users/admin/" + admin_id;
  const response = await fetch(endpoint, {
    headers: {
      "X-API-KEY": getKey(),
    },
  });
  var json = await response.json();
  return json ? json : [];
}

export async function postUser(data) {
  //make call to database
  let endpoint = endpoint_prefix + "users";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": getKey(),
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
      "X-API-KEY": getKey(),
    },
  });
  var json = await response.json();
  return json;
}
