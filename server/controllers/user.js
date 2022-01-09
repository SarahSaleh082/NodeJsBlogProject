const User = require('../models/user');
const jwt = require('jsonwebtoken');
const find = (query)=> User.find(query);
const create = (user)=>User.create(user);
const login = async({username, password}, res, next)=>{

    const user = await User.findOne({username});
    if(!user){
      next(`invalid username`) 
      return;
    }
    const isValid = await user.comparePassword(password);

    if(!isValid){
      next(`invalid password`) 
      return;
    }
    // return{
    //     // token: jwt.sign({username, _id: user._id, maxAge: '2d'}, process.env.SECRET)
        
    // }
    return jwt.sign(
        {
          username,
          _id: user._id,
          maxAge: "2d",
        },
        process.env.SECRET
      );

}
const follow = (_id, ID)=>User.updateOne({_id}, {$push: {following:ID}});
const getFollowing = (_id)=> User.findOne({_id},{following: 1});

const like = (_id, blogId)=>User.updateOne({_id}, {$push: {likes: blogId}});
const getLikes = (_id)=> User.findOne({_id},{likes: 1});


module.exports = {find, create, login, follow, getFollowing, like, getLikes};