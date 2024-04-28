const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    FirstName:{
        type: String,
        require: [true, "Please enter a name"]
    },
    LastName:{
        type: String,
        require: [true, "Please enter a name"]
    },
    email:{
        type: String,
        require: [true, "Please nete an email"],
        unique: [true, "Email already exist"]
    },
    password:{
        type: String,
        require: [true, "Please enter password"],
        minlength: [6, "Password must be of 6 chahracters"]
    },
    company:{
        type: String,
        require: [true, "Please enter a company"]
    },
    phone:{
        type: Number,
        require: [true, "Please enter your number"]
    },
    expenses:[
        {
            type: String,
        }
    ] 
})

userSchema.pre("save", async function(next){
    if(!this.isModified(this.password)){
        this.password = await bcrypt.hash(this.password, 10);
    }
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);
