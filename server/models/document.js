const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const DocumentSchema = new Schema({
  
  ref_code: {
    type: String,
    default: ''
  },
  building_name: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  extra: {
    type: String,
    default: ''
  },
  reference: {
    type: String,
    default: ''
  },
  reference_phone: {
    type: String,
    default: ''
  },
  zone: {
    type: String,
    default: ''
  },
  creation_date: {
    type: Date,
    default: new Date()
  },
  gdpr_main_reference: {
    type: String,
    default: ''
  },
  gdpr_main_reference_email: {
    type: String,
    default: ''
  },
  gdpr_secondary_reference: {
    type: String,
    default: ''
  },
  gdpr_secondary_reference_email: {
    type: String,
    default: ''
  },
  submitted: {
    type: Boolean,
    default: false
  },
  first_reminder: {
    type: Date,
    default: null
  },
  second_reminder: {
    type: Date,
    default: null
  },
  third_reminder: {
    type: Date,
    default: null
  }

})

//create model for todo
const Document = mongoose.model('document', DocumentSchema);

module.exports = Document;
