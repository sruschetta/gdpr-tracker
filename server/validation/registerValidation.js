const validator = require('validator');
const isEmpty = require('is-empty');


module.exports = function validateRegisterInput(data) {

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.surname = !isEmpty(data.surname) ? data.surname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if(validator.isEmpty(data.surname)) {
    errors.surname = 'Surname is required';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if(data.password != data.password2) {
    errors.password2 = "Passwords must be the same";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  };
}
