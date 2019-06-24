const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  },
  a: {
    type: Number,
    default: 40.0
  },
  b: {
    type: Number,
    default: 40.0
  },
  c: {
    type: Number,
    default: 40.0
  },
  d: {
    type: Number,
    default: 180.0
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "weitingbigjj");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
