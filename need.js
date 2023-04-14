const app = require('express');
const conn = require('./connection')
const need=(req,res)=>{
    conn.query(`Select * from donate`,(error,results)=>{
        if (error)
            console.log(error)
        else{
            res.json(results);
        }
            
            
    
    })
}
console.log("Success")
module.exports=need;