const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "qwertyuiopasdfghjklzxcvbnm"

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        res.send(error)
    }
}

userSchema.pre("save", async function (next){
    
    if(this.isModified("password")){
        // const passwordHash = await bcrypt.hash(password, 10)
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const Register = new mongoose.model("Register", userSchema)

module.exports = Register