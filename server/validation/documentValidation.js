const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateDocumentInput(data) {
  let errors = {};

  data.maintenance_type = !isEmpty(data.maintenance_type) ? data.maintenance_type : null;
  data.address = !isEmpty(data.address) ? data.address : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.reference = !isEmpty(data.reference) ? data.reference : '';
  data.gdpr_main_reference = !isEmpty(data.gdpr_main_reference) ? data.gdpr_main_reference : '';
  data.gdpr_main_reference_email = !isEmpty(data.gdpr_main_reference_email) ? data.gdpr_main_reference_email : '';

  data.gdpr_main_reference_type = !isEmpty(data.gdpr_main_reference_type) ? data.gdpr_main_reference_type : null;
  data.gdpr_secondary_reference_type = !isEmpty(data.gdpr_secondary_reference_type) ? data.gdpr_secondary_reference_type : null;
  data.zone = !isEmpty(data.zone) ? data.zone : null;
  data.client = !isEmpty(data.client) ? data.client : null;

  if (!data.maintenance_type || Validator.isEmpty(data.maintenance_type)) {
    errors.maintenance_type = 'Maintenance type field is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }
  if (Validator.isEmpty(data.reference)) {
    errors.reference = 'Reference field is required';
  }
  if (Validator.isEmpty(data.gdpr_main_reference)) {
    errors.gdpr_main_reference = 'GDPR main reference field is required';
  }
  if (Validator.isEmpty(data.gdpr_main_reference_email)) {
    errors.gdpr_main_reference_email = 'GDPR main reference email field is required';
  } else if (!Validator.isEmail(data.gdpr_main_reference_email)) {
    errors.gdpr_main_reference_email = "GDPR Main reference email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
