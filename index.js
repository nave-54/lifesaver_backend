const express = require("express")
const mysql = require('mysql');
const cors = require("cors")
const need = require('./need')
const signup = require('./signup')
const update = require("./update")
const newpass = require("./newpass")
const {forgotpass,forgotpassotp,verifyotp} = require("./forgot")
const {login} = require('./login');
const app = express()
const {donate,donated}=require("./donate");
app.use(express.json())
app.use(cors())
app.post("/signup",signup);
app.post("/forgotpass",forgotpass)
app.post("/forgotpassotp",forgotpassotp)
app.post("/verifyotp",verifyotp)
app.post("/update",update)
app.post("/donate",donate)
app.post("/login",login)
app.post("/newpass",newpass)
app.post("/donated",donated) 
// app.get("/loginname",loginname)
app.get('/need',need)
app.listen(8000);
