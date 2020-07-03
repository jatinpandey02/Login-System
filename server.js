const express = require("express")
const app = express()
const expressLayout=require('express-ejs-layouts')
const bcrypt = require('bcrypt')

console.log("Working")

app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.set('view engine','ejs')

var users=[]

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
    users.push({
        "name":name,
        "email":email,
        "password":password
    })
    res.redirect("/login")
    console.log(users)
})

app.post('/login',(req,res)=>{
    u = users.find(user=> user.email==req.body.email)
    if(u==null){
        res.render('login.ejs',{error:"Id not found"})
    }
    else if(bcrypt.compareSync(req.body.password,u.password)){
        res.send('You are in')
    }
    else{
        res.render('login.ejs',{error:'Wrong Password'})
    }
})

app.listen(3000)