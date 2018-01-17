var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');

 var superAdminSchema = new mongoose.Schema({
   email: {
       type: String,
       lowercase: true,
       unique: true,
       required: true
   },

   password: {
     type: String,
     required: true
   },

   isActive: {
     type: Boolean,
     default: true
   },

});

superAdminSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function () {

            }, function (err, hash) {
                if (err) {
                    return next(err);
                }
                // saving actual password as hash
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// compare two passwords

superAdminSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


superAdminSchema.set('toJSON', {virtuals: true});
superAdminSchema.set('toObject', {virtuals: true});

 module.exports = mongoose.model("superAdmin",superAdminSchema);
