const connection= require("./connection")
const express = require("express")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const signup=async (req,res)=>{
   let transport = nodemailer.createTransport({
      service : "gmail",
      auth : {
         user : "lifesaverdomain@gmail.com",
         pass : "unmrdijawdaogmrf"
      }
   })
   const name = req.body.name;
   const email = req.body.email;
   const pno = req.body.mno;
   const pass = req.body.pass;
   console.log(email)
   const cpass = req.body.cpass;
   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(email.length!=0)
   {
      if(!regex.test(email))
      {
         console.log(email)
         console.log(regex.test(email))
         res.status(400).send("Enter a valid email !!!")
      }
   }
   if(pass.length<8 || pass.length>16)
   {
      res.status(400).send("Password Length Must Within 8-16 Characters")
   }
   else if(pass!=cpass)
   {
      res.status(400).send("Password Do Not Match!!!")
   }
   else
   {
      const saltround = 10;
   const hpass= await bcrypt.hash(pass,saltround);
   console.log(hpass)
   const sign={
      name : name,
      email : email,
      pno : pno,
      pass :hpass
      

   }
   connection.query(`Select * from register where (pno)=('${pno}')`,(error,results)=>{
      if (error)
         console.log(error)
      else
      {
         if(results.length===0)
         {
            if(email.length===0)
            {
            connection.query(`Insert into register set ?`,sign,(error,results)=>{
               if(error)
                  console.log(error);
               else
                  console.log(results);
            })

            res.status(200).send("Successfully Signed Up !!!")
         }
         else{
            connection.query(`Select * from register where (email)=('${email}')`,(error,resultss)=>{
               if(error)
                   console.log(error)
               else{
                  if(resultss.length===0)
                  {
                     connection.query(`Insert into register set ?`,sign,(error,result)=>{
                        if(error)
                           console.log(error);
                        else
                           console.log(result);
                     })
                     var 𝐧𝐚𝐦𝐞𝟏 = name;
                     let content={
                        from : "lifesaverdomain@gmail.com",
                        to : email,
                        subject : "LIFE SAVER",
                        text : `𝐇𝐞𝐥𝐥𝐨 ${𝐧𝐚𝐦𝐞𝟏}, 
                        𝐅𝐢𝐫𝐬𝐭 𝐨𝐟 𝐚𝐥𝐥 , 𝐰𝐞 𝐚𝐫𝐞 𝐯𝐞𝐫𝐲 𝐠𝐥𝐚𝐝 𝐭𝐨 𝐢𝐧𝐯𝐢𝐭𝐞 𝐲𝐨𝐮 𝐭𝐨 𝐛𝐞 𝐚 𝐦𝐞𝐦𝐛𝐞𝐫 𝐢𝐧 "𝐋𝐈𝐅𝐄 𝐒𝐀𝐕𝐄𝐑"
                        
   𝐎𝐮𝐫 𝐆𝐫𝐞𝐚𝐭𝐞𝐟𝐮𝐥 𝐓𝐡𝐚𝐧𝐤𝐬 𝐓𝐨 𝐲𝐨𝐮.... 

   𝐈𝐟 𝐲𝐨𝐮 𝐝𝐨𝐧𝐚𝐭𝐞 𝐲𝐨𝐮𝐫 𝐛𝐥𝐨𝐨𝐝 𝐚𝐬 𝐮𝐫𝐠𝐞𝐧𝐭 𝐚𝐬 𝐧𝐞𝐞𝐝 𝐲𝐨𝐮 𝐚𝐫𝐞 𝐭𝐡𝐞 𝐩𝐞𝐫𝐬𝐨𝐧 𝐰𝐡𝐨 𝐡𝐚𝐝 𝐦𝐨𝐫𝐞 𝐠𝐫𝐚𝐭𝐞𝐟𝐮𝐥 𝐡𝐞𝐚𝐫𝐭𝐬 𝐭𝐡𝐚𝐧 𝐠𝐨𝐝... 
                        
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
                     res.status(200).send("Successfully Signed Up !!!")
                  }
                  else{
                     res.status(400).send("Email Already Exists!!!")
                  }
               }
            })
         }
            
         }
         else{
            res.status(400).send("Phone Number Already Exists!!!")
         }
      }
   })
   console.log("Signup Success db");
   
}

}
module.exports=signup;