const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 10

    },
    mail:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    img:{
        // required:true,
        data: Buffer,
        contentType: String
    },
    following:{
        type:
            [{type: String

            }]
    },
    bio:{
        type: String,
        minLength: 5,
        maxLength: 10
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{   
    toJSON: {
        transform: (doc, ret, opts) =>{
        delete ret.password;
        delete ret.v;
        console.log(ret);
        return ret;
        }
    }
})

userSchema.pre("save", function(){
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
});

userSchema.methods.comparePassword = function (password){
    const isValid = bcrypt.compareSync(password, this.password);
    return isValid
}

const User = mongoose.model("User", userSchema);
module.exports = User;