const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');
const fs = require('fs');

// Load input validation
const validateRegisterInput = require('../validation/registerValidation');
const validateLoginInput = require('../validation/loginValidation');
const validateDocumentInput = require('../validation/documentValidation');
const validateDocumentDeletion = require('../validation/documentDeletion');
const validateMaintenanceInput = require('../validation/maintenanceValidation');
const validateMaintenanceTypeDeletion = require('../validation/maintenanceTypeDeletion');
const validateZoneInput = require('../validation/zoneValidation');
const validateZoneDeletion = require('../validation/zoneDeletion');
const validateDocumentSubmission = require('../validation/documentSubmissionValidation');
const validateEmailSettingsInput = require('../validation/emailSettingsValidation');

// Models
const User = require('../models/user');
const Document = require('../models/document');
const MaintenanceType = require('../models/maintenance_type');
const Zone = require('../models/zone');
const ClientType = require('../models/client_type');
const EmailSettings = require('../models/email_settings');


//Email

const sendEmail = require('../email/email');


module.exports = (app) => {

    /*
    *
    * User Credentials
    *
    */

    app.get('/api/account/currentuser',
      passport.authenticate("jwt", { session: false }),
        (req, res) => {
        res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        });
      }
    );


    app.post('/api/account/register', function(req, res) {

        // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        User.findOne({ email: req.body.email }).then(user => {

          if (user) {
            return res.status(400).json({ email: 'User already exists' });
          }

          const newUser = new User();

          newUser.name = req.body.name;
          newUser.surname = req.body.surname;
          newUser.email = req.body.email;


          newUser.password = newUser.generateHash(req.body.password);
          newUser.save()
                 .then(user => res.json(user))
                 .catch(err => handleError(err));
          });
      });


    app.post('/api/account/login', function(req, res) {

      const { errors, isValid } = validateLoginInput(req.body);
      if(!isValid) {
        return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email: email }).then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        if(user.validPassword(password)) {

            const payload = {
              id: user.id,
              name: user.name
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: '120d'
              },
              (err, token) => {
                if(!err){
                  return res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
                else {
                  return res.status(400).json({error: 'token error'});
                }
               });
            } else {
                return res
                  .status(400)
                  .json({ error: 'Incorrect password' });
            }
        });
    });


    app.get('/api/users',
      passport.authenticate("jwt", { session: false }),
        function(req, res) {

          User.find({},{email: false, password: false, isDeleted:false, signUpDate:false}).then( users => {
            return res.json({
              users: users
            });
          })
        }
    );



    /*
    *
    * DOCUMENTS
    *
    */

    app.get('/api/document',

      passport.authenticate("jwt", { session: false }),
        function(req, res) {

          var page = req.query.page;
          var order = req.query.order;
          var orderBy = req.query.orderBy;

          if(page === "undefined") {
            page = 0;
          }
          else {
            page = page*50;
          }

          if(order === "undefined") {
            order = 'desc';
          }

          if(orderBy === "undefined") {
            orderBy = 'creation_date';
          }

          Document.count().then( (count) => {
            Document.find().skip(page).limit(50).sort({[orderBy]: order}).then( documents => {

              return res.json({
                documents: documents,
                count: count
              });
            });
          });
        }
    );

    app.post('/api/document',
      passport.authenticate('jwt', {session: false}),
        function(req,res) {

          // Form validation
          const { errors, isValid } = validateDocumentInput(req.body);

          // Check validation
          if (!isValid) {
            return res.status(400).json(errors);
          }

          const { body, user } = req;
          const newDocument = new Document();

          newDocument.ref_code = body.ref_code;
          newDocument.maintenance_type = body.maintenance_type;
          newDocument.building_name = body.building_name;
          newDocument.creation_date = body.creation_date;
          newDocument.address = body.address;
          newDocument.city = body.city;
          newDocument.province = body.province;
          newDocument.extra = body.extra;
          newDocument.reference = body.reference;
          newDocument.reference_phone = body.reference_phone;
          newDocument.reference_mobile = body.reference_mobile;
          newDocument.zone = body.zone;
          newDocument.gdpr_main_reference = body.gdpr_main_reference;
          newDocument.gdpr_main_reference_email = body.gdpr_main_reference_email;
          newDocument.gdpr_main_reference_type = body.gdpr_main_reference_type;
          newDocument.gdpr_secondary_reference = body.gdpr_secondary_reference;
          newDocument.gdpr_secondary_reference_email = body.gdpr_secondary_reference_email;
          newDocument.gdpr_secondary_reference_type = body.gdpr_secondary_reference_type;
          newDocument.creator = user._id;

          newDocument.save()
                     .then(document => { return res.json(document); })
                     .catch(err => handleError(err));

      });


      app.post('/api/document/search',
        passport.authenticate('jwt', {session: false}),
          function(req, res) {

            var {body} = req;

            //return res.json(body);
            var keyword = body.keyword;

            if(keyword.length === 1 || keyword.length === 2) {
              return res.status(400).json({errors: 'Search term is too short'});
            }

            var filters = {};

            if(body.filters){

              if(body.filters.userFilter) {
                filters.creator = body.filters.userFilter;
              }
              if(body.filters.maintenanceTypeFilter) {
                filters.maintenance_type = body.filters.maintenanceTypeFilter;
              }
              if(body.filters.zoneFilter) {
                filters.zone = body.filters.zoneFilter;
              }
            }

            if(keyword.length === 0) {

              Document.find(filters).count().then( (count) => {
                Document.find(filters).exec(function(err, documents) {

                      return res.json({
                        documents: documents,
                        count: count
                      });
                })
              });
            }
            else {

              var re = new RegExp(keyword, 'i');

              var conditions = [ { ref_code: { $regex: re }},
                                 { building_name: { $regex: re }},
                                 { address: { $regex: re }},
                                 { city: { $regex: re }},
                                 { extra: { $regex: re }},
                                 { reference: { $regex: re }},
                                 { gdpr_main_reference: { $regex: re }},
                                 { gdpr_main_reference_email: { $regex: re }},
                                 { gdpr_secondary_reference: { $regex: re }},
                                 { gdpr_secondary_reference_email: { $regex: re }},
                                ];

              Document.find(filters).or(conditions).count().then( (count) => {
                Document.find(filters).or(conditions).exec(function(err, documents) {
                          return res.json({
                            documents: documents,
                            count: count
                          });
                })
              });

          }
      });

      app.post('/api/document/:documentId/check',
        passport.authenticate('jwt', {session: false}),
          function(req,res) {

            // Form validation
            const { errors, isValid } = validateDocumentSubmission(req.body);

            // Check validation
            if (!isValid) {
              return res.status(400).json(errors);
            }

            Document.findByIdAndUpdate(params.documentId, {$set: body}, {new: false, useFindAndModify: false}, function(err, model) {
              if (err) {
                 return handleError(err);
              }
              else {
                return res.json({success: true});
              }
            });
          }
      );


      app.post('/api/document/:documentId/send',
        passport.authenticate('jwt', {session: false}),
          function(req,res) {

            var d = new Date();
            var item = {
              send_date: d
            };

            Document.findByIdAndUpdate(req.params.documentId, {$set: item}, {new: false, useFindAndModify: false}, function(err, model) {
              if (err) {
                 return handleError(err);
              }
              else {

                EmailSettings.findOne().then( item => {
                  sendEmail(model.gdpr_main_reference_email, item.subject, item.body);
                  return res.json({success: true});
                })
              }
            });
          }
      );


      app.delete('/api/document/:documentId',
        passport.authenticate('jwt', {session:false}),
          function(req, res) {

            // Form validation
            const { errors, isValid } = validateDocumentDeletion(req.params.documentId);

            // Check validation
            if (!isValid) {
              return res.status(400).json(errors);
            }

            const { params } = req;
            Document.deleteOne({ _id: params.documentId }, function (err) {
              if (err) {
                 return handleError(err);
              }
              else {
                return res.json({success: true});
              }
            });
      });

      app.put('/api/document/:documentId',
        passport.authenticate('jwt', {session:false}),
        function(req, res){

          const { params, body } = req;

          //Form Validation
          const { errors, isValid } = validateDocumentInput(body);

          // Check validation
          if(!isValid) {
            return res.status(400).json(errors);
          }

          Document.findByIdAndUpdate(params.documentId, {$set: body}, {new: false, useFindAndModify: false}, function(err, model) {
            if (err) {
               return handleError(err);
            }
            else {
              return res.json({success: true});
            }
          });
      });


      /*
      *
      * MAINTENANCE TYPES
      *
      */

      app.get('/api/maintenance_type',
        passport.authenticate("jwt", { session: false }),
          function(req, res) {
            MaintenanceType.find().sort({title: 'asc'}).then( items => {
              return res.json({
                items: items
              });
            })
      });


      app.post('/api/maintenance_type',
        passport.authenticate('jwt', {session: false}),
          function(req, res) {

            // Form validation
            const { errors, isValid } = validateMaintenanceInput(req.body);

            // Check validation
            if (!isValid) {
              return res.status(400).json(errors);
            }

            const { body } = req;
            const newMaintenanceType = new MaintenanceType();

            newMaintenanceType.title = body.title;

            newMaintenanceType.save()
                       .then(item => { return res.json(item); })
                       .catch(err => handleError(err));
        });


        app.delete('/api/maintenance_type/:typeId',
          passport.authenticate('jwt', {session:false}),
            function(req, res) {

              // Form validation
              const { errors, isValid } = validateMaintenanceTypeDeletion(req.params.typeId);

              // Check validation
              if (!isValid) {
                return res.status(400).json(errors);
              }

              const { params } = req;
              MaintenanceType.deleteOne({ _id: params.typeId }, function (err) {
                if (err) {
                   return handleError(err);
                }
                else {
                  return res.json({success: true});
                }
              });
        });

        app.put('/api/maintenance_type/:typeId',
          passport.authenticate('jwt', {session:false}),
            function(req, res) {

              const { params, body } = req;

              // Form validation
              const { errors, isValid } = validateMaintenanceInput(body);

              // Check validation
              if (!isValid) {
                return res.status(400).json(errors);
              }

              MaintenanceType.findByIdAndUpdate(params.typeId, {$set: body}, {new: false, useFindAndModify: false}, function(err, model) {
                if (err) {
                   return handleError(err);
                }
                else {
                  return res.json({success: true});
                }
              });
        });


        /*
        *
        * ZONES
        *
        */

        app.get('/api/zone',
          passport.authenticate("jwt", { session: false }),
            function(req, res) {
              Zone.find().sort({name: 'asc'}).then( items => {
                return res.json({
                  items: items
                });
              })
        });


        app.post('/api/zone',
          passport.authenticate('jwt', {session: false}),
            function(req, res) {

              // Form Validation
              const { errors, isValid } = validateZoneInput(req.body);

              // Check validation
              if (!isValid) {
                return res.status(400).json(errors);
              }

              const { body } = req;
              const newZone = new Zone();

              newZone.name = body.name;

              newZone.save()
                     .then(item => { return res.json(item); })
                     .catch(err => handleError(err));
          });


          app.delete('/api/zone/:zoneId',
            passport.authenticate('jwt', {session:false}),
              function(req, res) {

                // Form validation
                const { errors, isValid } = validateZoneDeletion(req.params.zoneId);

                // Check validation
                if (!isValid) {
                  return res.status(400).json(errors);
                }

                const { params } = req;

                Zone.deleteOne({ _id: params.zoneId }, function (err) {
                  if (err) {
                     return handleError(err);
                  }
                  else {
                    return res.json({success: true});
                  }
                });
                /*
                Zone.findByIdAndUpdate(params.zoneId, {$set: {selectable: false}}, {new: false, useFindAndModify: false}, function(err, model) {
                  if (err) {
                     return handleError(err);
                  }
                  else {
                    return res.json({success: true});
                  }
                });
                */
          });

          app.put('/api/zone/:zoneId',
            passport.authenticate('jwt', {session:false}),
              function(req, res) {

                const { params, body } = req;

                // Form validation
                const { errors, isValid } = validateZoneInput(body);

                // Check validation
                if (!isValid) {
                  return res.status(400).json(errors);
                }

                Zone.findByIdAndUpdate(params.zoneId, {$set: body}, {new: false, useFindAndModify: false}, function(err, model) {
                  if (err) {
                     return handleError(err);
                  }
                  else {
                    return res.json({success: true});
                  }
                });
          });

          /*
          *
          * Client types
          *
          */

          app.get('/api/client_type',
            passport.authenticate("jwt", { session: false }),
              function(req, res) {
                ClientType.find().sort({name: 'asc'}).then( items => {
                  return res.json({
                    items: items
                  });
                })
          });


          app.post('/api/client_type',
            passport.authenticate('jwt', {session: false}),
              function(req, res) {

                // Form Validation
                const { errors, isValid } = validateZoneInput(req.body);

                // Check validation
                if (!isValid) {
                  return res.status(400).json(errors);
                }

                const { body } = req;
                const newClientType = new ClientType();

                newClientType.name = body.name;

                newClientType.save()
                             .then(item => { return res.json(item); })
                             .catch(err => handleError(err));
            });


            app.delete('/api/client_type/:clientId',
              passport.authenticate('jwt', {session:false}),
                function(req, res) {

                  // Form validation
                  const { errors, isValid } = validateZoneDeletion(req.params.clientId);

                  // Check validation
                  if (!isValid) {
                    return res.status(400).json(errors);
                  }

                  const { params } = req;

                  ClientType.deleteOne({ _id: params.clientId }, function (err) {
                    if (err) {
                       return handleError(err);
                    }
                    else {
                      return res.json({success: true});
                    }
                  });
            });

            app.put('/api/client_type/:clientId',
              passport.authenticate('jwt', {session:false}),
                function(req, res) {

                  const { params, body } = req;

                  // Form validation
                  const { errors, isValid } = validateZoneInput(body);

                  // Check validation
                  if (!isValid) {
                    return res.status(400).json(errors);
                  }

                  ClientType.findByIdAndUpdate(params.clientId, {$set: body}, {new: false, useFindAndModify: false}, function(err, model) {
                    if (err) {
                       return handleError(err);
                    }
                    else {
                      return res.json({success: true});
                    }
                  });
            });


            /*
            *
            * Email Settings
            *
            */

            app.get('/api/email_settings',
              passport.authenticate("jwt", { session: false }),
                function(req, res) {
                  EmailSettings.findOne().then( items => {
                    return res.json({
                      items: items
                    });
                  })
            });


            app.post('/api/email_settings',
              passport.authenticate("jwt", {session: false}),
                function(req, res) {


                  // Form Validation
                  const { errors, isValid } = validateEmailSettingsInput(req.body);

                  // Check validation
                  if (!isValid) {
                    return res.status(400).json(errors);
                  }

                  const { body } = req;

                  var entry = {
                    subject: body.subject,
                    body: body.body,
                  }

                  if(req.files && req.files.file && req.files.file.data) {
                    fs.writeFile('./upload/caleffi-privacy.pdf', req.files.file.data, function(err) {
                        if(err) {
                            handleError(err);
                        }
                    });
                  }

                  EmailSettings.findOneAndUpdate({}, body, {upsert: true, new: true}, function(err, doc) {
                    if (err) {
                       return handleError(err);
                    }
                    else {
                      return res.json({success: true});
                    }
                  });
            });
}

handleError = function(err){
  console.log(err);
}

createDataset = function(num) {

  var arr = [];

  for(var i = 0; i < num; i++) {

    arr.push({
      ref_code: ('Ref_code_' + i),
      building_name: ('Building ' + i),
      address: ('Address ' + i),
      city: ('City ' + i),
      extra: ('Extra ' + i),
      reference: ('Mr. Reference ' + i),
      reference_phone: ('123.123123_' + i),
      gdpr_main_reference: ('GDPR Mr. ' + i),
      gdpr_main_reference_email: ('mail' + i + '@gdpr.it'),
      gdpr_secondary_reference: ('GDPR Mrs. ' + i),
      gdpr_secondary_reference_email: ('mail' + i + '@gdpr.com')
    });

  }

  Document.collection.insert(arr, function(err, el){
    if(err){
      console.log(err);
    }
  });
}





//wncucuubnuqfgflc
