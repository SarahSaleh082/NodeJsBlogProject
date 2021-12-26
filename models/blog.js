const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    body:{
        type: String,
        required: true,
        minLength: 5,
        maxlength: 10

    },
    author:{
        type:String
    },
    img:{
        required:true,
        data: Buffer,
        contentType: String
    },
    tags: {
        type: [
          {
            type: String,
            maxlength: 10,
          },
        ],
    }
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;