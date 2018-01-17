var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');


var controllerSchema = new mongoose.Schema({

  branchID: {
     type:String
   },
  controllerID: {
    type: String,
    unique:true
  },
  password: {
    type: String,
  },
  name: {
    type:String
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
controlmac: {
  type:String,
},
workdays: [
      {
          type:String
      }
    ],
hoursOfWorkDaily: {
       type: Number
     },
  country:{
    type:String
  },
isActive: {
   type: Boolean,
   default: true
 }

});

// Save user's hashed password
controllerSchema.pre('save', function (next) {
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


controllerSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// controllerSchema.virtual('name.full').get(function () {
//   var last = (this.name.last === undefined || this.name.last === null) ? '' : this.name.last;
//   return this.name.first + ' ' + last;
// });

controllerSchema.set('toJSON', {virtuals: true});
controllerSchema.set('toObject', {virtuals: true});


module.exports = mongoose.model('controller', controllerSchema);
