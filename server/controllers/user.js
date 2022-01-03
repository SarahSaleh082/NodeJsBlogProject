const User = require('../models/user');
const jwt = require('jsonwebtoken');
const find = (query)=> User.find(query);
const create = (user)=>User.create(user);
const login = async({username, password})=>{
    const user = await User.findOne({username});
    const isValid = await user.comparePassword(password);
    if(!isValid){
        throw `invalid password`;
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
module.exports = {find, create, login};