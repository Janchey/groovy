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
    } else if (comment[0].comment.length < 3 || comment[0].comment.length > 150) {
        return false;
    } else {
        return true;
    }
};


const commentValidation = [
    {
        validator: checkComment,
        message: 'Comment must be at least 3 characters long but not longer than 150'
    }
];

const ComicSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        validate: titleValidation
    },
    image: {
        data: Buffer,
        contentType: String
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
    number:{
        type: Number,
        min: 1,
        required: true
    },
    originalNumber: {
        type: Number,
        min: 1,
        required: true
    },
    yearPublished: {
        type: Number,
        min: 1900,
        max: 2018,
        required: true
    },
    ganre: {
        type: Array,
        required: true
    },
    createdBy: { type: String },
    publishedDate: { 
        type: Date, 
        default: Date.now() 
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: Array
    },
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: {
        type: Array
    },
    comments: [{
        comment: { type: String /*, validate: commentValidation */},
        commentator: { type: String }
    }]
});

module.exports = mongoose.model('Comic', ComicSchema);


