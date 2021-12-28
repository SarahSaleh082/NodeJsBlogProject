const Blog = require('../models/blog');

const find = (query)=> Blog.find(query);
const create = (blog)=>Blog.create(blog);
const deleteDocument = (id) => Blog.deleteOne({ id });
const updateDocument = (id, body) => Blog.findOneAndUpdate({ id }, body);

module.exports = {find, create, deleteDocument, updateDocument};