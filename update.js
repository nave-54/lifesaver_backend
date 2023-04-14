const connection = require("./connection")
const update=(req,res)=>{
    const id = req.body.id
     
    const name = req.body.name
    const  pno = req.body.mno
    const  email = req.body.email
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(pno.length!=10)
    {
        res.status(400).send("Enter A valid number")
    }
   if(email!=null)
   {
      if(!regex.test(email))
      {
        //  console.log(email)
        //  console.log(regex.test(email))
         res.status(400).send("Enter a valid email !!!")
      }
   }
    connection.query(`Select * from register where (id)=('${id}')`,(error,results)=>{
        if(results[0].pno===pno && results[0].email===email && results[0].name===name)
        {
            res.status(400).send("Match with your Old data")
        }
        else if(results[0].pno===pno && results[0].email===email && results[0].name!=name)
        {
            connection.query(`Update donate set name=('${name}') where id=('${id}')`)
            connection.query(`Update register set name=('${name}') where id=('${id}')`)
            res.status(200).json(results)
        }
        else{
            connection.query(`Select * from register where (pno)=('${pno}' and id!=('${id}'))`,(err,resu)=>{
                if(resu===null)
                {
                    if(email!=null)
                    {
                        connection.query(`Select * from register where (email)=('${email}') and id!=('${id}')`,(err,resul)=>{
                            // console.log(resul)
                            if(resul.length===0)
                            {
                                connection.query(`Update donate set name=('${name}'),pno=('${pno}'),email=('${email}') where id=('${id}')`)
                                connection.query(`Update register set name=('${name}'),pno=('${pno}'),email=('${email}') where id=('${id}')`,(err,rem)=>{
                                    if(error)
                                    {
                                        res.status(400).send("Failed to Update")
                                    }
                                    else
                                    {
                                        res.status(200).json(rem)
                                    }
                                })
                            }
                            else{
                                res.status(400).send("Email Already Exists")
                            }
                        })
                    }
                }
                else
                {
                    if(email!=null)
                    {
                        connection.query(`Select * from register where (email)=('${email}') and id!=('${id}')`,(err,resul)=>{
                            // console.log("ji "+resul)
                            if(resul.length===0)
                            {
                                connection.query(`Update donate set name=('${name}'),pno=('${pno}'),email=('${email}') where id=('${id}')`)
                                connection.query(`Update register set name=('${name}'),pno=('${pno}'),email=('${email}') where id=('${id}')`,(err,rem)=>{
                                    if(error)
                                    {
                                        res.status(400).send("Failed to Update")
                                    }
                                    else
                                    {
                                        res.status(200).json(rem)
                                    }
                                })
                            }
                            else{
                                res.status(400).send("Email Already Exists")
                            }
                        })
                    }
                    else{
                    res.status(400).send("Phone number Already Exists")
                    }
                }
            })
        }
    })
}
module.exports=update