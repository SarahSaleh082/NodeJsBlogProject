const Blog = require('../models/blog');
const User = require('../models/user');

const authBlogMiddleWare = async (req, res, next)=>{
    const userID = req.user._id.toString();
    const userName = req.user.username; //login
    const user = await User.findOne({_id: userID})
    if(user.isAdmin){
        next()
    }else{
        const blogID = req.params.id;
        const blog = await Blog.findOne({_id: blogID}).populate('author'); //get blog with author populate
        const blogAuthor = blog.author.username; //get username from author
        if(userName == blogAuthor){
            next()
        }else{
            res.json(`You don't have permission`);
        }
    }

}



module.exports = authBlogMiddleWare;