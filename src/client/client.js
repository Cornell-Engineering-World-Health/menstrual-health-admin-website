
var options = require("./key.json");
var endpoint_prefix = 'https://menstralhealthgameserver.herokuapp.com/api/'


// GET

export async function getUser(user_id) {
    //make call to database
    let endpoint = endpoint_prefix + 'users/' + user_id
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': await getKey()
      }
    });
    var json = await response.json();
    return await response.json();
}

export async function getUsers() {
  //make call to database
  let endpoint = endpoint_prefix + 'users'
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getUsersByAdmin(admin_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'users/' + admin_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();

  return json;
}

export async function getQuestion(question_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'questions/' + question_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getQuestions() {
  //make call to database
  let endpoint = endpoint_prefix + 'questions'
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getAllProgress() {
  //make call to database
  let endpoint = endpoint_prefix + 'progress'
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getProgress(progress_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'progress/' + progress_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getUserProgress(user_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'progress/' + user_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getQuestionProgress(question_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'progress/' + question_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getUserQuestionProgress(user_id, question_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'progress/' + user_id + '/' + question_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getAdmin(admin_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'admins/' + admin_id
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function getAdmins() {
  //make call to database
  let endpoint = endpoint_prefix + 'admins'
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': await getKey()
    }
  });
  var json = await response.json();
  return json;
}

// POST

export async function getKey() {
  let endpoint = options.url;
  options.body = JSON.stringify(options.body);
  const response = await fetch(endpoint, options);
  var res = await response.json();
  var token = res.token_type + ' ' + res.access_token
  return token;
  }

export async function postUser(data) {
    //make call to database
    let endpoint = endpoint_prefix + 'users'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });

    var json = await response.json();
    return json;
}

export async function postQuestion(data) {
    //make call to database
    let endpoint = endpoint_prefix + 'questions'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}

export async function postProgress(data) {
    //make call to database
    let endpoint = endpoint_prefix + 'progress'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}

export async function postAdmin(data) {
    //make call to database
    let endpoint = endpoint_prefix + 'admins'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}

// DELETE

export async function deleteUser(user_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'users/' + user_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization' : await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function deleteQuestion(question_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'questions/' + question_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization' : await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function deleteProgress(progress_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'progress/' + progress_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization' : await getKey()
    }
  });
  var json = await response.json();
  return json;
}

export async function deleteAdmin(admin_id) {
  //make call to database
  let endpoint = endpoint_prefix + 'admins/' + admin_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Authorization' : await getKey()
    }
  });
  var json = await response.json();
  return json;
}

// PUT

export async function putQuestion(data, question_id) {
    //make call to database
    let endpoint = endpoint_prefix + 'questions/' + question_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}

export async function putProgress(data, progress_id) {
    //make call to database
    let endpoint = endpoint_prefix + 'progress/' + progress_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}

export async function putAdmin(data, admin_id) {
    //make call to database
    let endpoint = endpoint_prefix + 'admins/' + admin_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : await getKey()
      },
      body: JSON.stringify(data)
    });
    var json = await response.json();
    return json;
}
