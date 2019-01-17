const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateDocumentSubmission(data) {
  let errors = {};

  data.submitted = !isEmpty(data.submitted) ? data.submitted : '';

  if (Validator.isEmpty(data.submitted)) {
    errors.submitted = 'Maintenance type field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
