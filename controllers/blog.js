const Blog = require('../models/blog');

const find = (query)=> Blog.find(query);
const create = (blog)=>Blog.create(blog);

module.exports = {find, create};