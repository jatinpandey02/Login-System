const express = require("express")
app = express()
const expressLayout=require('express-ejs-layouts')

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
    var password=req.body.password
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
    else if(u.password==req.body.password){
        res.send('Shi Password')
    }
    else{
        res.render('login.ejs',{error:"Wrong Password"})
    }
})

app.listen(3000)