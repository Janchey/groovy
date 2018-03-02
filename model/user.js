const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Check email length
let checkEmail = (email) => {
    if (!email) {
        return false;
    } else if (email.length < 8 || email.length > 40) {
        return false;
    } else {
        return true;
    }

};

// Check if valid e-mail format
let validEmailFormat = (email) => {
    if (!email) {
      return false;
    } else {
      // Regular expression that tests email format
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email);
    }
  };

const emailValidation = [
    {
        validator: checkEmail,
        message: 'E-mail must be at least 8 characters long but not longer than 40'
    },
    {
        validator: validEmailFormat,
        message: 'Must be a valid e-mail'
    }
];

let checkUsername = (username) => {
    if (!username) {
        return false;
    } else if (username.length < 2 || username.length > 22) {
        return false;
    } else {
        return true;
    }
};

// Check if valid username format
let validUsernameFormat = (username) => {
    if (!username) {
      return false;
    } else {
      // Regular expression that tests username format
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(username);
    }
  };

  const usernameValidation = [
    {
        validator: checkUsername,
        message: 'Username must be at least 2 characters long but not longer than 22'
    },
    {
        validator: validUsernameFormat,
        message: 'Username cant have any special characters'
    }
];

let checkPassword = (password) => {
    if (!password) {
        return false;
    } else if (password.length < 8 || password.length > 25) {
        return false;
    } else {
        return true;
    }
};

// Check if valid password format
let validPassword = (password) => {
    if (!password) {
      return false;
    } else {
      // Regular expression that tests password format
      const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
      return regExp.test(password);
    }
  };

  
  const passwordValidation = [
    {
        validator: checkPassword,
        message: 'Password must be at least 8 characters long but not longer than 25'
    },
    {
        validator: validPassword,
        message: 'Password must have minimum eight characters, at least one letter and one number'
    }
];

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidation
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidation
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidation
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) { return next(err); }
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
/*
const ComicSchema = new Schema({
    title: { 
    type: String,
    lowercase: true
    },
    creator: { 
    type: String,
    lowercase: true
    },
    writer: { 
    type: String,
    lowercase: true
    },
    artist: { 
    type: String,
    lowercase: true
    },
    publisher: { 
    type: String,
    lowercase: true
    },
    status: { 
    type: String,
    lowercase: true
    },
    number: Number,
    originalNumber: Number,
    yearPublished: { 
        type: Number,
        min: 1900,
        max: 2100
    },
    ganre: {type: Array}

});
*/