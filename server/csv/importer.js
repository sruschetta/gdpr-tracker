const csv = require('csvtojson');

const OldDocument = require('../models/old_document');

const ClientType = require('../models/client_type');

const fs = require('fs');


module.exports = function importCSV(csvFilePath, date){

  csv({
    noheader: false,
    trim: true,
    delimiter: ';',
    ignoreEmpty: true,
  })
  .fromFile(csvFilePath)
  .then((jsonObj)=>{

    fs.unlinkSync(csvFilePath);

    ClientType.find().sort({name: 'asc'}).then( manTypes => {

      jsonObj.forEach( (item) => {

        const oldDocument = new OldDocument();

        if(item['1']) {
          oldDocument.ref_code = item['1'].replace(/\uFFFD/g, '');
        }

        if(item['2']) {
          oldDocument.building_name = item['2'].replace(/\uFFFD/g, '');
        }

        oldDocument.creation_date = date;

        if(item['3']) {
          oldDocument.city = item['3'].replace(/\uFFFD/g, '');
        }

        if(item['4']) {
          oldDocument.reference = item['4'].replace(/\uFFFD/g, '');
        }

        if(item['5']){
          var phone = validatePhone(item['5'].replace(/\uFFFD/g, ''));
          if(phone) {
            oldDocument.reference_phone = item['5'].replace(/\uFFFD/g, '');
          }
        }

        var email = validateEmail(item['13']);
        if(email){
          oldDocument.gdpr_main_reference_type = manTypes[0]._id;
          if(item['12']){
            oldDocument.gdpr_main_reference = item['12'].replace(/\uFFFD/g, '');
          }
          oldDocument.gdpr_main_reference_email = item['13'].replace(/\uFFFD/g, '').toLowerCase();
        }
        else {

          email = validateEmail(item['11']);

          if(email){
            oldDocument.gdpr_main_reference_type = manTypes[1]._id;
            if(item['10']){
              oldDocument.gdpr_main_reference = item['10'].replace(/\uFFFD/g, '');
            }
            oldDocument.gdpr_main_reference_email = item['11'].replace(/\uFFFD/g, '').toLowerCase();
          }
          else {

            email = validateEmail(item['9']);

            if(email){
              oldDocument.gdpr_main_reference_type = manTypes[3]._id;
              if(item['8']){
                oldDocument.gdpr_main_reference = item['8'].replace(/\uFFFD/g, '');
              }
              oldDocument.gdpr_main_reference_email = item['9'].replace(/\uFFFD/g, '').toLowerCase();
            }
            else {
              email = validateEmail(item['15']);
              if(email){
                  oldDocument.gdpr_main_reference_type = manTypes[2]._id;
                  if(item['14']){
                    oldDocument.gdpr_main_reference = item['14'].replace(/\uFFFD/g, '');
                  }
                  oldDocument.gdpr_main_reference_email = item['15'].replace(/\uFFFD/g, '').toLowerCase();
              }
            }
          }
        }

        if(!email){
          console.log("email missing!");
        }
        oldDocument.save()
                   .then()
                   .catch(err => handleError(err));
        });
    });
  });
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  var re = /^([0-9\s]+)$/;
  return re.test(String(phone).toLowerCase());
}
