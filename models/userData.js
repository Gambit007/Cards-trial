var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var updateUserData = new Schema({
     userid: String,
     savedvalues: Array,
     isUpdated: {
          type: Number,
          required: true,
          default: 1
     },
     created_at: {
          type: Date,
          required: true,
          default: Date.now
     },
     updated_at: {
          type: Date,
          required: true,
          default: Date.now
     }
}, {
     strict: false
});

module.exports = mongoose.model('tbl_user_data', updateUserData);