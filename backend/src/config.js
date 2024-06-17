const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/my-user");

//check database connect or not
connect.then(()=>{

    console.log("connect the database is successful");

})

.catch(()=>{

    console.log("connection failed connect the database");
})

//create the schema
const MyUserSchema = new mongoose.Schema({

    name: String,
    address: String,
    phone: String,
    devices: [{ serialNumber: String, type: String, image: String, status: String }]

});

const MyUser = new mongoose.model("user",MyUserSchema);
// Export the MyUser model
module.exports = MyUser;