const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:{type:String,req:true},
    email:{type:String,req:true},
    password:{type:String,req:true},
})
module.exports=mongoose.model("User",UserSchema)