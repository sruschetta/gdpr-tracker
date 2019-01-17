const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  selectable: {
    type: Boolean,
    default: true
  }
});

const Zone = mongoose.model('Zone', ZoneSchema);

module.exports = Zone;
