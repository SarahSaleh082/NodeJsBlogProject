const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    body:{
        type: String,
        required: true,
        minLength: 5,
        maxlength: 300

    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,

    },
    image:{
        type: String
        // required:true,
        // data: Buffer,
        // contentType: String
    },
    id:{
        type: Number,
        default: 0,

    },
    tags: {
        type: [
          {
            type: String,
            minLength: 5,
            maxlength: 20,
          },
        ],
    }
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;