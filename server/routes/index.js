const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');

// Load input validation
const validateRegisterInput = require('../validation/registerValidation');
const validateLoginInput = require('../validation/loginValidation');
const validateDocumentInput = require('../validation/documentValidation');
const validateDocumentDeletion = require('../validation/documentDeletion');

// Models
const User = require('../models/user');
const Document = require('../models/document');

module.exports = (app) => {

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
                 .catch(err => console.log(err));
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
                expiresIn: 6000
              },
              (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
               });
            } else {
                return res
                  .status(400)
                  .json({ error: 'Password incorrect' });
            }
        });
    });

    app.get('/api/document',
      passport.authenticate("jwt", { session: false }),
        function(req, res) {
          Document.find().then( documents => {
            res.json({
              documents: documents
            });
          })
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

          const { body } = req;
          const newDocument = new Document();

          newDocument.ref_code = body.ref_code;
          newDocument.building_name = body.building_name;
          newDocument.address = body.address;
          newDocument.extra = body.extra;
          newDocument.reference = body.reference;
          newDocument.reference_phone = body.reference_phone;
          newDocument.zone = body.zone;
          newDocument.gdpr_main_reference = body.gdpr_main_reference;
          newDocument.gdpr_main_reference_email = body.gdpr_main_reference_email;
          newDocument.gdpr_secondary_reference = body.gdpr_secondary_reference;
          newDocument.gdpr_secondary_reference_email = body.gdpr_secondary_reference_email;

          newDocument.save()
                     .then(document => { return res.json(document); })
                     .catch(err => console.log(err));

      });

      app.delete('/api/document/:documentId',
        passport.authenticate('jwt', {session:false}),
          function(req, res) {

            console.log(req.params);

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
}
