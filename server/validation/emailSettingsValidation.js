const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateEmailSettingsInput(data) {

  let errors = {};

  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.body = !isEmpty(data.body) ? data.body : '';

  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
