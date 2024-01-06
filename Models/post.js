
const mongoose=require('mongoose');

const postschema= new mongoose.Schema({
    text : String,
    email:String,
    username:String
});

const post=mongoose.model("posts",postschema)
module.exports=post