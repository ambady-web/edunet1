const express=require('express')
const mongoose=require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const cors = require("cors")


const app=express()
const PORT=3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Example Route

app.get('/',(req,res)=>{
    res.send("<h2 align= center>welcome to the session<h2>")
})
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message:"User Registered"})
        console.log("User Registration completed...")

    }catch(err)
    {
        console.log(err)
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({ message: "invalid Credentials" });
        }
        res.json({ message: "Login Succesfull",username: user.username});
    }
    catch(err)
    {
        console.log(err)
    }
})
mongoose.connect("mongodb+srv://xanthomonas:xanthomonas1234@cluster0.g9ayk.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{console.log("DB connected succesfull..")}
).catch(

    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
        {
            console.log(err)
    }
console.log("server is running on port: "+PORT)
})