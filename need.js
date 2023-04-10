const app = require('express');
const conn = require('./connection')
const need=(req,res)=>{
    const query = "Select * from donate";
    conn.query(query,(error,results)=>{
        if (error)
            console.log(error)
        else{
            res.json(results);
        }
            
            
    
    })
}
console.log("Success")
module.exports=need;