const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const Register = require("./models/registers")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("./db/conn")
require("./models/registers")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const port = process.env.PORT || 8000


// Routing
app.post("/register", (req, res) => {
    const {fname, lname, email, phone, address, password} = req.body
    Register.findOne({email: email}, (err, user) => {
        if(user) {
            res.send({message: "User already exists"})
        } else {
            const user = new Register({
                fname,
                lname,
                email,
                phone,
                address,
                password
            })

            const token = user.generateAuthToken()

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            })

            user.save((err) => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "Successfully registered!!! Please login now."})
                }
            })
        }
    })
    
})

app.post("/login", (req, res) => {
    const {email, password} = req.body
    Register.findOne({email: email}, (err, user) => {
        if(user){
            const isMatch = bcrypt.compare(password, user.password)

            const token = user.generateAuthToken()

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            })

            if(isMatch){
                res.send({message: "Login Successful", user: user})
            } else{
                res.send({message: "Password didn't match"})
            }
        } else{
            res.send({message: "User is not registered"})
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})