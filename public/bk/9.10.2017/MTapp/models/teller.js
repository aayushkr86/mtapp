var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');


var tellerSchema = new mongoose.Schema({

  branchID: {
     type:String
   },
  // _tellerID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'tellerID'
  // },
  tellerID:{
    type:Number
  },
  password: {
    type: String,
  },
  email: {
      type: String,
      lowercase: true,
      unique: true,
  },
   name: {
  	   type:String
     },
  phone:{
    type: String,
  },
  address :{
    type:String
  },
tellermac: {
  type:String,
  
},
paymentLimit:{
  type:Number,
},
_superVisior:{
  type: mongoose.Schema.Types.ObjectId,
  //required: true,
  ref: 'supervisior'
},
// logintime:{
//  type: Date,
//  default: Date.now
// },
 startTime:{
   type:String
 },
 endTime:{
   type:String
 },
actual:{
  type:String,
},
isActive: {
   type: Boolean,
   default: true
 },
  currentbalance:{
   type:Number
 },
 upcomingStatus:{
  type:String
 },
 language:{
  type:String
}

});

// Save user's hashed password
tellerSchema.pre('save', function (next) {
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


tellerSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// tellerSchema.virtual('name.full').get(function () {
//   var last = (this.name.last === undefined || this.name.last === null) ? '' : this.name.last;
//   return this.name.first + ' ' + last;
// });

tellerSchema.set('toJSON', {virtuals: true});
tellerSchema.set('toObject', {virtuals: true});


module.exports = mongoose.model('teller', tellerSchema);
