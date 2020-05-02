import * as mongoose from 'mongoose'

export var UserSchema =  mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  }
  
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);