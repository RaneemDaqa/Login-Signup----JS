const container = document.querySelector(".container"),
  loginForm = document.querySelector(".login-form"),
  signupForm = document.querySelector(".signUp-form"),
  updateForm = document.querySelector(".UpdateProfile-form"),
  forms = document.querySelectorAll("form");

// Buttons
const signUpButton = document.querySelector(".signup-button"),
  loginButton = document.getElementById("login"),
  editButton = document.getElementById("Edit-text"),
  cancelButton = document.getElementById("Cancel-text"),
  saveButton = document.getElementById("save"),
  submitButton = document.getElementById("updateSubmit");

// Update form fields
const updateFirstName = document.getElementById("Update-First-Name"),
  updateSecondName = document.getElementById("Update-Second-Name"),
  updateEmail = document.getElementById("Update-Email"),
  updateCountry = document.getElementById("Update-country"),
  updateAge = document.getElementById("Update-age"),
  updatePassword = document.getElementById("Update-password"),
  updateConfirmPassword = document.getElementById("Update-Confirm-password");

function setFormActive(className) {
  forms.forEach((form) => {
    form.classList.remove("active");
    form.style.display = "none";
  });
  const activeForm = document.querySelector(`.${className}`);
  activeForm.classList.add("active");
  activeForm.style.display = "block";
}

loginButton.addEventListener("click", function (event) {
  if (validateLoginForm()) {
    setFormActive("UpdateProfile-form");
  } else {
    event.preventDefault();
  }
});

saveButton.addEventListener("click", function (event) {
  if (validateForm(signupForm)) {
    setFormActive("UpdateProfile-form");
  } else {
    event.preventDefault();
    console.log("error");
  }
});

signUpButton.addEventListener("click", function () {
  setFormActive("signUp-form");
});

cancelButton.addEventListener("click", function () {
  setFormActive("login-form");
});

editButton.addEventListener("click", function () {
  enableUpdateFields();
});

submitButton.addEventListener("click", function (event) {
  if (validateForm(updateForm)) {
    setFormActive("login-form");
  } else {
    event.preventDefault();
  }
});

function validateForm(formName) {
  const firstName = formName.querySelector(".firstName");
  const secondName = formName.querySelector(".secondName");
  const email = formName.querySelector(".email");
  const country = formName.querySelector(".country-select");
  const age = formName.querySelector(".age");
  const password = formName.querySelector(".password");
  const confirmPassword = formName.querySelector(".confirmPassword");
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  /*
 example@example.com
john.doe@domain.co
user123@sub.domain.org
first.last@company.info
  */

  if (!nameRegex.test(firstName.value.trim())) /*test --> true ,false */
    {alert("First Name should contain only alphabets");
    return false;
  }

  if (!nameRegex.test(secondName.value.trim())) {
    alert("Second Name should contain only alphabets");
    return false;
  }

  if (!emailRegex.test(email.value.trim())) {
    alert("Please enter a valid email address");
    return false;
  }

  const ageValue = parseInt(age.value.trim());
  if (isNaN(ageValue) || ageValue < 18) /*isNaN(is not a number)*/{
    alert("Age must be a number and larger than 18");
    return false;
  }

  if (password.value.length < 3) {
    alert("Password should be at least 3 characters long");
    return false;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return false;
  }

  const userData = {
    firstName: firstName.value.trim(),
    secondName: secondName.value.trim(),
    email: email.value.trim(),
    country: country.value,
    age: ageValue,
    password: password.value.trim(),
  };

  setDataInLocalStorage("userData", userData);

  return true;
}

function enableUpdateFields() {
  fillProfileFields();
  const inputFields = updateForm.querySelectorAll("input, select");
  inputFields.forEach(function (field) {
    field.removeAttribute("disabled");
  });
}

function disableUpdateFields() {
  const inputFields = updateForm.querySelectorAll("input, select");
  inputFields.forEach(function (field) {
    field.setAttribute("disabled", "disabled"); //attribute name,value
  });
}

function setDataInLocalStorage(key, value) {
  const user = {id: "", email: "dddd", name: ""};



  const {email: hamzahEmail, ...others} = user;
  
  let existingData = localStorage.getItem(key);
  existingData = existingData ? JSON.parse(existingData) : {};

  existingData = { ...existingData, ...value };/*copy the properties*/

  localStorage.setItem(key, JSON.stringify(existingData));
}

function validateLoginForm() {
  const enteredEmail = document.getElementById("Login-Email").value.trim();
  const enteredPassword = document
    .getElementById("Login-password")
    .value.trim();

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  let isValid = false;
  if ( storedUserData &&  enteredEmail === storedUserData.email &&  enteredPassword === storedUserData.password) {
    localStorage.setItem("isLoggedIn", "true");
    isValid = true;
    setFormActive("UpdateProfile-form");
    fillProfileFields();
  } else {
    alert("Invalid email or password. Please try again");
  }

  return isValid;
}

function fillProfileFields() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData) {
    if (storedUserData.firstName)
      updateFirstName.value = storedUserData.firstName;
    if (storedUserData.secondName)
      updateSecondName.value = storedUserData.secondName;
    if (storedUserData.email) updateEmail.value = storedUserData.email;
    if (storedUserData.country) updateCountry.value = storedUserData.country;
    if (storedUserData.age) updateAge.value = storedUserData.age;
  }
}

function checkLocalStorage() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userData = localStorage.getItem("userData");

  if (isLoggedIn === "true" && userData) {
    setFormActive("UpdateProfile-form");
    fillProfileFields();
  } else {
    localStorage.setItem("isLoggedIn", "false");
    setFormActive("login-form");
  }
}

window.onload = function () {
  checkLocalStorage();
};



/*

function updateUserData() {

  fillProfileFields();

  const updatedUserData = {
    firstName: updateFirstName.value.trim(),
    secondName: updateSecondName.value.trim(),
    email: updateEmail.value.trim(), 
    country: updateCountry.value.trim(),
    age: parseInt(updateAge.value.trim()), 
    password: updatePassword.value.trim(), 
  };

  localStorage.setItem("userData", JSON.stringify(updatedUserData));
  alert("Profile updated successfully!");
  disableUpdateFields();
}


*/
