const express = require("express")
const app = express()
const expressLayout=require('express-ejs-layouts')
const bcrypt = require('bcrypt')
const User = require('/Users/jatinpandey/Desktop/Web Dev/login system/User.js')
const mongoose = require('mongoose')

console.log("Working")

app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.set('view engine','ejs')

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/',function(req,res){
    res.render('index')
})

app.get('/login',function(req,res){
    res.render('login')
})

app.get('/register',function(req,res){
    res.render('register')
})

app.post('/register',function(req,res){
    var email=req.body.email
    var name=req.body.name
    var password=bcrypt.hashSync(req.body.password,10)
    User.findOne({email:email}).then(user=>{
        if(user){
            res.render('/register.ejs',{error:"User with email id exist"})
        }
        else{
            const newUser = new User({
                name,
                email,
                password
            })
            newUser.save()
        }
    })
    res.redirect("/login")
    console.log(users)
})

app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            res.render('login.ejs',{error:"Id not found"})
        }
        else if(bcrypt.compareSync(req.body.password,user.password)){
            res.send('You are in')
        }
        else{
            res.render('login.ejs',{error:'Wrong Password'})
        }
    })
})

app.listen(3000)