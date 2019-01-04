const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateDocumentInput(data) {
  let errors = {};

  data.ref_code = !isEmpty(data.ref_code) ? data.ref_code : '';
  data.building_name = !isEmpty(data.building_name) ? data.building_name : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.reference = !isEmpty(data.reference) ? data.reference : '';
  data.reference_phone = !isEmpty(data.reference_phone) ? data.reference_phone : '';
  data.gdpr_main_reference = !isEmpty(data.gdpr_main_reference) ? data.gdpr_main_reference : '';
  data.gdpr_main_reference_email = !isEmpty(data.gdpr_main_reference_email) ? data.gdpr_main_reference_email : '';
  data.gdpr_secondary_reference = !isEmpty(data.gdpr_secondary_reference) ? data.gdpr_secondary_reference : '';
  data.gdpr_secondary_reference_email = !isEmpty(data.gdpr_secondary_reference_email) ? data.gdpr_secondary_reference_email : '';

  if (Validator.isEmpty(data.ref_code)) {
    errors.ref_code = 'Ref. code field is required';
  }
  if (Validator.isEmpty(data.building_name)) {
    errors.building_name = 'Building name field is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }
  if (Validator.isEmpty(data.reference)) {
    errors.reference = 'Reference field is required';
  }
  if (Validator.isEmpty(data.reference_phone)) {
    errors.reference_phone = 'Reference phone field is required';
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
