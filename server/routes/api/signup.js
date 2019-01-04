const User = require('../../models/user');

module.exports = (app) => {

  app.post('/api/account/signup', function(req, res) {

    const {body} = req;
    const {password, name, surname} = body;
    let {email} = body;

    if(!email) {
      return res.send({
        success: false,
        message: 'Error: email cannot be blank.'
      });
    }

    if(!password) {
      return res.send({
        success: false,
        message: 'Error: password cannot be blank.'
      });
    }

    if(!name) {
      return res.send({
        success: false,
        message: 'Error: name cannot be blank.'
      });
    }

    if(!surname) {
      return res.send({
        success: false,
        message: 'Error: surname cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({email: email}, (err, prevUsers) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error. Server error.'
        });
      } else if(prevUsers.length > 0) {
        return res.send({
          succes: false,
          message: 'Error. Account already exists.'
        });
      }
    })

    //Saving a new User

    const newUser = new User();

    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.name = name;
    newUser.surname = surname;

    newUser.save((err, user) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: server error.'
        });
      }
      else {
        return res.send({
          success: true,
          message: 'Signed up.'
        });
      }
    });
  });
}
