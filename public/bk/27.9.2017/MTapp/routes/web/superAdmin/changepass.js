var User = require('../../../models/superAdmin');
var jwt = require('jsonwebtoken');
var config = require('../../../config')[process.env.NODE_ENV || 'development'];

module.exports = {

  /******** forgot password ***/

  postSendChangePassMail: function (req, res) {

    var payload = {
      handle: req.body.email.toLowerCase(), // the email for whom to change pass
    }
    User.count({ email: req.body.email.toLowerCase() }, function (err, count) {
      if (err || !count) {
        return res.json({ complete: false, error: true, message: `No user with email '${req.body.email}' exists in our Database!` });
      }
      var token = jwt.sign(payload, config.secret, {expiresIn: '1h'});

      var TinyURL = require('tinyurl');
      TinyURL.shorten(config.siteUrl+'/adminchangepass/'+token, function (shorturl) {
        var locals = {
          to: req.body.email,
          // to: 'gorai.ranjit13@gmail.com', // for testing
          subject: 'Password Change Request for MTS',
          handle: req.body.email,
          changePassURL: shorturl
        }
        res.mailer.send('emails/forgotpassword', locals, function (err) {
          if (!err)
          console.log('Password email sent successfully to %s !', locals.handle);
          //  res.send('done!');
          else {
            console.log("error: %o", err);
            // res.send({error: true})
          }
        });
      })

      return res.json({complete: true }); // Although we don't actually wait for email sending to complete!
    });

  },

  getChangePass: function (req, res) {
    var token = req.params.token;
    var decoded = jwt.decode(token); // NOT verified!!
    // res.json({ token: token, handle: decoded.handle });
    res.render('adminchangepass', {
      token: token,
      handle: decoded.handle
    })
  },

  postChangePass: function (req, res) {
    var token = req.body.token;
    var newpass = req.body.newpass;
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ error: true, message: "Invalid or Expired Token!", reason: err });
      }
      var handle = decoded.handle;
      // Now change password in DB
      User
      .findOne({email: handle})
      .then(function (user) {
        user.password = newpass;
        return user.save();
      })
      .then(function (savedUser) {
        return res.json({error: false, savedUser: savedUser});
      })
      .catch(function (err) {
        return res.json({error: true, message: "Failed to change password for " + handle, reason: err });
      })
    })
  }

}
