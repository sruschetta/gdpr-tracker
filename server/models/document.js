const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');
const Zone = require('./zone');
const Maintenance_type = require('./maintenance_type');
const Client_type = require('./client_type');

const DocumentSchema = new Schema({

  ref_code: {
    type: String,
    text: true,
    default: ''
  },
  building_name: {
    type: String,
    text: true,
    default: ''
  },
  address: {
    type: String,
    text: true,
    default: ''
  },
  city: {
    type: String,
    text: true,
    default: ''
  },
  extra: {
    type: String,
    text: true,
    default: ''
  },
  reference: {
    type: String,
    text: true,
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
    text: true,
    default: ''
  },
  gdpr_main_reference_email: {
    type: String,
    text: true,
    default: ''
  },
  gdpr_main_reference_type: {
    type: Schema.Types.ObjectId,
    ref: 'Client_type'
  },
  gdpr_secondary_reference: {
    type: String,
    text: true,
    default: ''
  },
  gdpr_secondary_reference_email: {
    type: String,
    text: true,
    default: ''
  },
  gdpr_secondary_reference_type: {
    type: Schema.Types.ObjectId,
    ref: 'Client_type'
  },
  submitted: {
    type: Boolean,
    default: false
  },
  send_date: {
    type: Date,
    default: null
  },
  first_reminder: {
    type: Date,
    default: null
  },
  second_reminder: {
    type: Date,
    default: null
  },
  zone:{
    type: Schema.Types.ObjectId,
    ref: 'Zone'
  },
  maintenance_type: {
    type: Schema.Types.ObjectId,
    ref: 'Maintenance_type'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

const Document = mongoose.model('document', DocumentSchema);

module.exports = Document;
