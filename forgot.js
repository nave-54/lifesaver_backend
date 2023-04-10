const conn  = require("./connection")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
// const messagebird = require('messagebird');
// const messagebirdApiKey = 'B70t7ViJAUD7AXo417JMfRHaa';
// const client = messagebird.Client(messagebirdApiKey);
const forgotpass=(req,res)=>{
    const memail = req.body.name
    const pass = req.body.pass
    conn.query(`Select * from register where (email)=('${memail}') or (pno)=('${memail}')`,async(err,results)=>{
        console.log(results)
        if(results.length===0)
        {
            res.status(400).send("User not exist")
        }
        else{
                const hpass = await bcrypt.compare(pass,results[0].pass)
                if(!hpass)
                {
                    res.status(400).send("Wrong Password")
                }
                else{
                    res.status(200).send("Success... Change the Password")
                }
        }
    })
}
var randomNumber = 0
var con = 0
const forgotpassotp=(req,res)=>{
    const memail = req.body.name
    con=1
    const min = 100000;
    const max = 999999;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("otp : "+randomNumber)
   if(memail.length===0)
    {
        res.status(400).send("Please Enter the valid Info")
    }
    else
    {
        conn.query(`Select * from register where (pno)=('${memail}')`,(err,results)=>{
            if(results.length===0)
            {
                conn.query(`Select * from register where (email)=('${memail}')`,(err1,results1)=>{
                        if(results1.length===0)
                        {
                            res.status(200).send("User is Not Registered")
                        }
                        else{
                            let transport = nodemailer.createTransport({
                                service : "gmail",
                                auth : {
                                   user : "lifesaverdomain@gmail.com",
                                   pass : "unmrdijawdaogmrf"
                                }
                             })
                             let content={
                                from : "lifesaverdomain@gmail.com",
                                to : memail,
                                subject : "OTP  FROM LIFE SAVER",
                                text : `Your OTP is ,
                                ${randomNumber}
        Please Don't Share to Anyone.. 
                                
           𝐖𝐢𝐭𝐡 𝐑𝐞𝐠𝐚𝐫𝐝𝐬,
          𝐓𝐄𝐀𝐌 𝐋𝐈𝐅𝐄 𝐒𝐀𝐕𝐄𝐑
        `
                             }
                             transport.sendMail(content,(err,info)=>{
                                if(err)
                                {
                                   console.log(err)
                                }
                                else{
                                   console.log("Response : "+info.response)
                                }
                             })
                        }
                })
                res.status(200).send("OTP Successfully Send to Your Mail")
            }
        })
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if(!regex.test(memail))
        // {
        //     console.log(memail)
        //     console.log(regex.test(memail))
        //     res.status(400).send("Enter a valid email !!!")
        // }
}
    // var params = {
    //     originator: '9500908275',
    //     recipients: [phoneNumber],
    //     body: message
    // };

    // client.messages.create(params, function (err, response) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log(response);
    // });
}
const verifyotp =(req,res)=>{
    if(con===1)
    {
    const memail = req.body.name
    const otp = req.body.otp
    if(otp!=randomNumber)
    {
        res.status(400).send("Invalid Otp !!! ")
    }
    else{
        res.status(200).send("Otp Verified !!!")
        }
    }
    else{
        res.status(400).send("Please Go Again...")
    }
    }
module.exports={
    forgotpass : forgotpass,
    forgotpassotp :forgotpassotp,
    verifyotp : verifyotp
}