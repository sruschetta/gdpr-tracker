const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateZoneInput(data) {

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Il campo Nome è obbligatorio.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
