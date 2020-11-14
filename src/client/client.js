var endpoint_prefix = "https://menstralhealthgameserver.herokuapp.com/api/";

export async function getKey() {
  return process.env.API_KEY;
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
  return json ? json : [];
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
