var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/consigliere');


var accountSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true},
  arn: String,
  accountNumber: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date
});

accountSchema.pre('save',function(next){
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at)
    this.created_at = currentDate;
  next();
});

accountSchema.methods.close = function(callback){
  mongoose.connection.close(function(err){
    if(err){
      callback(err);
    }
    else {
      callback(null);
    }
  })
}

var Account = mongoose.model('Account', accountSchema);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

module.exports = Account;
