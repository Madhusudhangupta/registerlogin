const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/usersDB")
.then(() => {
    console.log("Connection of database is successful")
})
.catch((err) => {
    console.log(err)
})
