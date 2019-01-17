const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSettingsSchema = new Schema({
  subject: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  }
});

const EmailSettings = mongoose.model('email_settings', EmailSettingsSchema);

module.exports = EmailSettings;
