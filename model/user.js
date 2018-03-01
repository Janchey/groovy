const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let checkEmail = (email) => {
    if (email){
        return false;
    } else{
        if (email.length < 8 || email.length > 40) {
            return false;
        } else{
            return true;
        }
    }
};

const emailValidation = [
    {
        validator: checkEmail,
        maessage: 'E-mail must be at least 8 characters long but not longer than 40'
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
        lowercase: true
        },
    password: { 
        type: String,
        required: true
        }
});

userSchema.pre('save', function (next) {
    if(!this.isModified('password')){
        return next();
    }

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {return next(err);}
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