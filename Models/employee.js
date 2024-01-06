
const mongoose=require('mongoose');

const empschema= new mongoose.Schema({
    email:String,
    username:String,
    phone:String,   
    password:String,
    status:String
});

const empmodel=mongoose.model("employees",empschema)
module.exports=empmodel