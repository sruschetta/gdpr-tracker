const csv = require('csvtojson');

const OldDocument = require('../models/old_document');
const Document = require('../models/document');
const ClientType = require('../models/client_type');

const fs = require('fs');

const EmailSettings = require('../models/email_settings');
const sendEmail = require('../email/email');


module.exports.importCSV = function(csvFilePath, date){

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

        oldDocument.save()
                   .then()
                   .catch(err => handleError(err));
        });
    });
  });
}

module.exports.sendOldDocuments = function(num) {

  var counter = 0;

  var timer = setInterval(function(){

    if(counter < num) {

      counter ++;

      OldDocument.findOne( {"gdpr_main_reference_email": {"$ne": ""}}).sort({"creation_date": "desc"}).then( (oldDocument) => {

        var email = oldDocument.gdpr_main_reference_email;
        if(!email) {
          return handleError("Empty email address!");
        }


        OldDocument.find({gdpr_main_reference_email: email}, function(err, oldDocuments){
            if (err) {
               return handleError(err);
            }

            var d = new Date();

            for (i = 0; i < oldDocuments.length; i++){
              oldDocuments[i]["send_date"] = d;
            }

            Document.insertMany(oldDocuments, function(err, documents) {
              if (err) {
                 return handleError(err);
              }

              var allIds = [];
              for (i = 0; i < oldDocuments.length; i++){
                allIds[i] = oldDocuments[i]["_id"];
              }

              OldDocument.deleteMany({_id: {$in: allIds}}, function(err) {
                  if(err) {
                      return handleError(er);
                  }

                  //Check if the selected email exists in current Documents (avoiding double send)
                  /*Document.findOne({gdpr_main_reference_email: email}, function(err, document){
                    if(err) {
                      return handleError(err);
                    }

                    if(!document) {*/
                      //Send email
                      EmailSettings.findOne().then( item => {
                        sendEmail(email, item.subject, item.body);
                      });
                    //}
                  //});
              });
           });
        });
      });
    }
    else {
      clearInterval(timer);
    }
  }, 30000);



  /*

  OldDocument.findById(req.params.documentId , function(err, oldDocument) {
    if (err) {
       return handleError(err);
    }
    var email = oldDocument.gdpr_main_reference_email;
    if(!email)
    {
      return handleError("Empty email address!");
    }

    OldDocument.find({gdpr_main_reference_email: email}, function(err, oldDocuments){
        if (err) {
           return handleError(err);
        }

        var d = new Date();

        for (i = 0; i < oldDocuments.length; i++){
          oldDocuments[i]["send_date"] = d;
        }

        Document.insertMany(oldDocuments, function(err, documents) {
          if (err) {
             return handleError(err);
          }

          var allIds = [];
          for (i = 0; i < oldDocuments.length; i++){
            allIds[i] = oldDocuments[i]["_id"];
          }

          OldDocument.deleteMany({_id: {$in: allIds}}, function(err) {
              if(err) {
                  return handleError(er);
              }

              //Send email
              EmailSettings.findOne().then( item => {
                sendEmail(email, item.subject, item.body);
                return res.json({success: true});
              });
          });
        });
     });
   });

   */
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  var re = /^([0-9\s]+)$/;
  return re.test(String(phone).toLowerCase());
}
