const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Check title length
let checkTitle = (title) => {
    if (!title) {
        return false;
    } else if (title.length < 3 || title.length > 80) {
        return false;
    } else {
        return true;
    }

};

// Check if title has eny special characters
let checkTitleCaracters = (title) => {
    if (!title) {
        return false;
    } else {
        // Regular expression that tests title
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title);
    }
};

const titleValidation = [
    {
        validator: checkTitle,
        message: 'Title must be at least 3 characters long but not longer than 80'
    },
    {
        validator: checkTitleCaracters,
        message: 'Title cant contain any special characters'
    }
];


let checkComment = (comment) => {
    if (!comment[0]) {
        return false;
    } else if (comment[0].length < 3 || comment[0].length > 200) {
        return false;
    } else {
        return true;
    }
};


const commentValidation = [
    {
        validator: checkComment,
        message: 'Comment must be at least 3 characters long but not longer than 200'
    }
];

const ComicSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        validate: titleValidation
    },
    creator: {
        type: String,
        lowercase: true,
        required: true
    },
    writer: {
        type: String,
        lowercase: true,
        required: true
    },
    artist: {
        type: String,
        lowercase: true,
        required: true
    },
    publisher: {
        type: String,
        lowercase: true,
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        required: true
    },
    number: Number,
    originalNumber: Number,
    yearPublished: {
        type: Number,
        min: 1900,
        max: 2100
    },
    ganre: { type: Array },
    likes: {
        number: Number,
        default: 0
    },
    likedBy: {
        number: Array
    },
    dislikes: {
        number: Number,
        default: 0
    },
    dislikedBy: {
        number: Array
    },
    comments:[{
        comment: {type: String, validate: commentValidation },
        commentator: { type: String },
        
    }]
});

module.exports = mongoose.model('Comic', ComicSchema);


