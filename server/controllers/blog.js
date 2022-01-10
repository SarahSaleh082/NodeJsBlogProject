const Blog = require('../models/blog');

const find = (query, limit, skip)=> Blog.find(query).limit(limit).skip(skip).populate('author');
const findById = (id)=> Blog.findOne({id}).populate('author');
const create = (blog)=>Blog.create(blog);
const deleteDocument = (_id) => Blog.deleteOne({ _id });
const updateDocument = (_id, body) => Blog.update({ _id }, body);
const findBlogsByUserId = (_id)=> Blog.find({author: _id}).populate('author');
const findBlogsByTitle = async(title)=> {
    const regex = new RegExp(title)
    return Blog.find(
    {title: {$regex: regex}}).populate('author')};
const findTags = ()=> Blog.find({}, {tags: 1, _id: 0});
const findByTagName = (tagName)=> Blog.find({tags: tagName}).populate('author');
module.exports = {find, create, deleteDocument, updateDocument, findById, findBlogsByUserId, findBlogsByTitle, findTags, findByTagName};