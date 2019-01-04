const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateDocumentDeletion(data) {
  let errors = {};

  data = !isEmpty(data) ? data : '';

  if (Validator.isEmpty(data)) {
    errors.ref_code = 'Id field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

};
