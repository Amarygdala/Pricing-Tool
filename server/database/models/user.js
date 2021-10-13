const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
      firstName: {
          type: String,
          required: true,
      },
      lastName: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          required: true,
          unique: true
      },
      phone: {
          type: String,
          required: true,
      },
      password: {
          type: String,
          required: true,
          minlength: 6
      }
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("UserData", UserSchema);

module.exports = User;