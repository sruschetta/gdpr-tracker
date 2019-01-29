
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
    errors.maintenance_type = 'Il campo Tipologia Intervento è obbligatorio.';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Il campo Indirizzo è obbligatorio.';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'Il campo Città è obbligatorio.';
  }
  if (Validator.isEmpty(data.province)) {
    errors.province = 'Il campo Provincia è obbligatorio.';
  }
  if (Validator.isEmpty(data.reference)) {
    errors.reference = 'Il campo Codice Riferimento è obbligatorio.';
  }
  if (Validator.isEmpty(data.gdpr_main_reference)) {
    errors.gdpr_main_reference = 'Il campo Riferimento GDPR è obbligatorio.';
  }
  if (Validator.isEmpty(data.gdpr_main_reference_email)) {
    errors.gdpr_main_reference_email = 'Il campo Email Riferimento GDPR è obbligatorio.';
  } else if (!Validator.isEmail(data.gdpr_main_reference_email)) {
    errors.gdpr_main_reference_email = 'Email non valida.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
