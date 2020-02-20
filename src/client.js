
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

export async function getUsersByAdmin() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/users/:admin_id'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getQuestion() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/questions/:question_id'
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

export async function getProgress() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/:progress_id'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getUserProgress() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/:user_id'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getQuestionProgress() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/progress/:question_id'
  const response = await fetch(endpoint);
  console.log(response);
  return await response.json();
}

export async function getAdmin() {
  //make call to database
  let endpoint = 'http://localhost:5000/api/admins/:admin_id'
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













var key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik56WTVNamRDUmprd05FTkJNMFpGUVRVd00wUTFSVGcyUXpnMFJqRXlSakpETkRkQlJUY3dPUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1taHMuYXV0aDAuY29tLyIsInN1YiI6ImVMc0dwWDFZdFFJTmhmVVVoeGJHT01JRDdSYU5UNzNYQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21ocy1hcGkiLCJpYXQiOjE1ODE4OTMzODksImV4cCI6MTU4MTk3OTc4OSwiYXpwIjoiZUxzR3BYMVl0UUlOaGZVVWh4YkdPTUlEN1JhTlQ3M1giLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.XPISNKdueu3hT_7BHh5yitAw40oGaMqOCX7bNe45RIhm_2Xnf91AmvYi4cCkijDtwpDZTnbSG3idFkOdTs2RbLy4MFkMSt2XChqszgxB1OvZVMKAhnXYc-yItnu8Per05PyIG5Xo6OCLMUd1NUywWH_EwcwnhP9lnHXDxP-B6qEE6yq-mGPqpDc3xgCzcEbOMNAquFYUyRuyK3TQE2kdOKu-sa280BQ62_uC5MR2zavBuQsBivhVEb5mqcMQYAB3rTgCEe33MT8WG3PnpxYCpJbqUw90ocVvkOzie41jlXX9uqHDQA3Ywzvsn76tg6EoDtMtFmMwFjEHrfplW06a_w'
