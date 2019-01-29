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
    errors.name = 'Il campo Nome è obbligatorio.';
  }

  if(validator.isEmpty(data.surname)) {
    errors.surname = 'Il campo Cognome è obbligatorio.';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Il campo Email è obbligatorio.';
  } else if (!validator.isEmail(data.email) || (!data.email.includes('caleffi.com'))) {
    errors.email = 'Email non valida.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Il campo Password è obbligatorio.';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'La Password deve contenere almeno 6 caratteri.';
  }

  if(data.password != data.password2) {
    errors.password2 = 'Le Password devono coincidere.';
  }

  return {
      errors,
      isValid: isEmpty(errors)
  };
}
