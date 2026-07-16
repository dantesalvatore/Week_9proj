const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    }, 
    content: {
        type: String,
        required: true,
        minlength: 10,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        required: true,
    }, 
    }, 
     {timestamps: true},
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;