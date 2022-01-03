const Blog = require('../models/blog');
const User = require('../models/user');

const authBlogMiddleWare = async (req, res, next)=>{
    const userID = req.user._id.toString();
    const user = await User.findOne({_id: userID})
    if(user.isAdmin){
        next()
    }else{
        const blogID = req.params.id;
        const blog = await Blog.findOne({_id: blogID});
        const blogAuthor = blog.author;
        if(user.username == blogAuthor){
            next()
        }else{
            res.json(`You don't have permission`);
        }
    }

}



module.exports = authBlogMiddleWare;