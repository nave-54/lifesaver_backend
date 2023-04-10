const conn =require("./connection")
const newpass = async (req,res)=>{
const memail = req.body.memail
const npass = req.body.npass
const cnpass = req.body.cnpass
const bcrypt = require("bcrypt")
    if(npass!=cnpass)
    {
        res.status(400).send("Password Mismatched")
    }
    else
    {
        conn.query(`Select * from register where (email)=('${memail}') or (pno)=('${memail}')`,async(err,results)=>{
            
            console.log(results[0].pass +" "+npass)
            const hashpass = await bcrypt.compare(npass,results[0].pass)
            if(hashpass)
            {
                res.status(400).send("Password matched with your old password")
            }
            else{
                const sets = await bcrypt.hash(npass,10)
                console.log(results[0].id)
                conn.query(`Update register SET pass =('${sets}') where id=('${results[0].id}')`,(err,ress)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else{
                        console.log("res"+ress)
                    }
                })
                res.status(200).send("New Password Set Successfully")
            }
    })
    }
}
module.exports = newpass