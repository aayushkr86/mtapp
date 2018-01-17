var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');


var supervisiorSchema = new mongoose.Schema({
	 branchID: {
     type:String
    },
  supervisiorID: {
    type: String,

  },
  password: {
    type: String,
  },
  name: {
      type: String,
    },
  email: {
      type: String,
      lowercase: true,
      unique: true,
  },
  phone:{
    type: String,
  },
  address :{
    type:String
  },
  country :{
    type:String,
  },
  supermac:{
   type:String
  },
  workdays: [
        {
            type:String
        }
 ],

hoursOfWorkDaily: {
         type: Number
},
isActive: {
   type: Boolean,
   default: true
 },
 supervisiortype:{
  type:String,
  enum:['Maker','Checker']
},


});

// Save user's hashed password
supervisiorSchema.pre('save', function (next) {
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


supervisiorSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


supervisiorSchema.set('toJSON', {virtuals: true});
supervisiorSchema.set('toObject', {virtuals: true});


module.exports = mongoose.model('supervisior', supervisiorSchema);
