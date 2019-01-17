const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientTypeSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
});

const ClientType = mongoose.model('client_type', ClientTypeSchema);

module.exports = ClientType;
