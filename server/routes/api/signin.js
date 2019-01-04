const UserSession = require('../../models/UserSession');
const loginValidation = require('../../validation/login');


module.exports = (app) => {

  app.post('/api/account/login', (req, res, next) => {

    //Validation
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.find({email: req.body.email}, (error, users) => {
      if(err) {
        return res.status(404).json({ error: "Server error" });
      }
      if(users.length != 1) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = users[0];
      if(!user.validPassword(password)) {
        return res.status(400).json({ passwordincorrect: "Wrong password" });
      }

      const payload = {
        id: user.id,
        name: user.name
      };

      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 60 // 1 year in seconds
        },
        (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );


      const UserSession = new UserSession();
      UserSession.userId = user._id;
      UserSession.save( (err, doc) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: server error.'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    })
  }
}
