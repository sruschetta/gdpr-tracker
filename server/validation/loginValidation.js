const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Il campo Email è obbligatorio.';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email non valida.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Il campo Password è obbligatorio.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};
