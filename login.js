const express = require("express")
const app = express()
const conn = require('./connection')
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
var session = require('express-session')
var con=0;
var name=""
app.use(express.json())

const login=async (req,res)=>
{
    console.log("LOGIN SERVER")
    const memail = req.body.memail
    const pass = req.body.pass
        conn.query(`Select * from register where (email) = ('${memail}') or (pno)=('${memail}')`,async (error,results)=>{
            console.log(results)
            if(error)
                console.log(error)

            else
            {
                if(results.length===0)
                    res.status(400).send("User is Not Registered")
                else
                {
                 const hashpass = await bcrypt.compare(pass,results[0].pass)
                 if(hashpass)
                    {   
                        conn.query(`Select * from donate where (pno)=('${results[0].pno}')`,(err,rest)=>{
                            console.log(rest)
                            if(rest.length===0)
                            {
                                const obj ={
                                    uname : results[0].name,
                                    uemail : results[0].email,
                                    upno : results[0].pno,
                                    udec : true 
                                }
                                console.log(obj)
                               res.status(200).send(obj)
                            }
                            else{
                                const obj ={
                                    uname : results[0].name,
                                    uemail : results[0].email,
                                    upno : results[0].pno,
                                    udec : false 
                                }
                                console.log(obj)
                               res.status(200).send(obj)
                            }
                        })
                        
                   }
                    else{
                        res.status(400).send("Password is MisMatched!!!")
                    }
                }
            }
    })
    // console.log(query)
    console.log(memail+" "+pass)
}
const loginname=(req,res)=>
{   
    if(con===1)
    {
        res.status(200).send(name)
    }
    else{
        res.status(400).send("Please Login and Fill it out")
    }

}
module.exports = {
    login : login,
    loginname : loginname
}