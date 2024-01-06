
const mongoose=require('mongoose');

const bookmarkpostschema= new mongoose.Schema({

    postid:String,
    saverEmail:String,
    
    
});

const bookmarkpost=mongoose.model("bookmarkposts",bookmarkpostschema)
module.exports=bookmarkpost