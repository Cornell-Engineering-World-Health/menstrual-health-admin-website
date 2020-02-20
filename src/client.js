
// GET

export async function getUser(user_id) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/users/' + user_id
    const response = await fetch(endpoint);
    console.log(response);
    return await response.json();
}

export async function getUsers() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/users'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getUsersByAdmin(admin_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/users/' + admin_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getQuestion(question_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/questions/' + question_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getQuestions() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/questions'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getAllProgress() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getProgress(progress_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/' + progress_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getUserProgress(user_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/' + user_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getQuestionProgress(question_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/' + question_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getUserQuestionProgress(user_id, question_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/' + user_id + '/' + question_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getAdmin(admin_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/admins/' + admin_id
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getAdmins() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/admins'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

// POST

// SOURCE https://gist.github.com/lastguest/1fd181a9c9db0550a847
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

export async function postUser(data) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/users'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

export async function postQuestion(data) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/questions'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

export async function postProgress(data) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/progres'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

export async function postAdmin(data) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/admins'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

// DELETE

export async function deleteUser(user_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/users/' + user_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
  });
  console.log(response);
  return await response.json();
}

export async function deleteQuestion(question_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/questions/' + question_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
  });
  console.log(response);
  return await response.json();
}

export async function deleteProgress(progress_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/' + progress_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
  });
  console.log(response);
  return await response.json();
}

export async function deleteAdmin(admin_id) {
  //make call to database
  let endpoint = 'http://localhost:5000/api/admins/' + admin_id
  const response = await fetch(endpoint, {
    method: 'DELETE',
  });
  console.log(response);
  return await response.json();
}

// PUT

export async function putQuestion(data, question_id) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/questions/' + question_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

export async function putProgress(data, progress_id) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/progress/' + progress_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}

export async function putAdmin(data, admin_id) {
    //make call to database
    let endpoint = 'http://localhost:5000/api/admins/' + admin_id
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      body: toUrlEncoded(data),
    });
    console.log(response);
    return await response.json();
}
