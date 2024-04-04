const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const financialSchema = new mongoose.Schema({
    in: {
        type: Number,
        required: true,
        default: 0
    },
    out: {
        type: Number,
        required: true,
        default: 0
    }
});

const monthSchema = new mongoose.Schema({
    Jan: financialSchema,
    Feb: financialSchema,
});

const userSchema = mongoose.Schema({
    name:{
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
    financeData: {
        type: monthSchema,
        default: {}
    }  
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
