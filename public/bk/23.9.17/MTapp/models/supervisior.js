var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');


var supervisiorSchema = new mongoose.Schema({

  _branchID: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'branch'
   },
  supervisiorID: {
    type: String,
    unique:true
  },
  password: {
    type: String,
  },
  name:{
    type:String
  },
  surName:{
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
macAddress: {
  type:String,
  unique: true,
},
isActive: {
   type: Boolean,
   default: true
 }

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

// supervisiorSchema.virtual('name.full').get(function () {
//   var last = (this.name.last === undefined || this.name.last === null) ? '' : this.name.last;
//   return this.name.first + ' ' + last;
// });

supervisiorSchema.set('toJSON', {virtuals: true});
supervisiorSchema.set('toObject', {virtuals: true});


module.exports = mongoose.model('supervisior', supervisiorSchema);
