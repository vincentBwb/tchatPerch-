const express = require('express');
const app = express();
const route = express.Router();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const formidable = require ('formidable');
const pug = require('pug');
const passwordHash = require('password-hash');
const io = new Server(server);
const path = require("path");
const myPort = 8000;
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

const signin = require('./modules/signin.js')
const login = require('./modules/login.js')

app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "scripts")));

app.set('views', 'views');
app.set('view engine','pug');

//-------- database MongoDB = "tchatperche"  ; Collection ="users" -------------



// lOGIN ================================================================================

app.get('/',(req,res)=>{
res.sendFile(__dirname+"/html/login.html");
})

app.post('/',(req,res)=>{
    login.loginUser(req,res,MongoClient,url,formidable);
})

        //→ Route en cas d'erreur de login
app.get('/login2',(req,res)=>{
    res.sendFile(__dirname+"/html/loginerror.html");
    })
    
app.post('/login2',(req,res)=>{
    login.loginUser(req,res,MongoClient,url,formidable);
})

// SIGNIN ================================================================================

app.get('/signin',(req,res)=>{
res.sendFile(__dirname+"/html/signin.html");
})
  
app.post('/signin', (req,res)=>{
    signin.createUser(req,res,MongoClient,url,formidable);
})

     //→ Route en cas de doublon de username
app.get('/signin2',(req,res)=>{
    res.sendFile(__dirname+"/html/signinerror.html");
    })

app.post('/signin2', (req,res)=>{
    signin.createUser(req,res,MongoClient,url,formidable);
})

// PROFIL ===============================================================================

/* app.get('/profil',(req,res)=>{
    res.sendFile(__dirname+"/html/profil.html");
    })
    
app.post('/profil',(req,res)=>{
    profil.loginUser(req,res,MongoClient,url,formidable);
}) */

// LOBBY ================================================================================
            
app.get('/lobby',(req,res)=>{
    res.sendFile(__dirname+"/html/lobby.html");
    })

// Socket Tchat General ===============================================================================

io.on('connection', (socket)=>{
    console.log('User connected');
    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    }) 
    //
    socket.on('tchat message', (msg)=>{
        console.log('message recu' + msg);
        io.emit('tchat message', msg);
    })
})


server.listen(myPort, ()=>{console.log("http://localhost:"+myPort)});



