const Blog = require('../models/blog');

const find = (query)=> Blog.find(query).populate('author');
const findById = (id)=> Blog.findOne({id}).populate('author');
const create = (blog)=>Blog.create(blog);
const deleteDocument = (_id) => Blog.deleteOne({ _id });
const updateDocument = (_id, body) => Blog.update({ _id }, body);
const findBlogsByUserId = (_id)=> Blog.find({author: _id}).populate('author');
module.exports = {find, create, deleteDocument, updateDocument, findById, findBlogsByUserId};