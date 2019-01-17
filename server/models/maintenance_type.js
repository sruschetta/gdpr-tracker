const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintenanceTypeSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
});

const MaintenanceType = mongoose.model('maintenance_type', MaintenanceTypeSchema);

module.exports = MaintenanceType;
