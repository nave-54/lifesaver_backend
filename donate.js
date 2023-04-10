const connection=require("./connection")
const express = require("express");

    const donate=(req,res)=>{
            const donates={
            name : req.body.name,
            pno :  req.body.pno,
            email : req.body.email,
            dob :  req.body.dob,
            anum : req.body.anum,
            bgrp : req.body.bgrp,
            weight : req.body.weight,
            gen : req.body.gen,
            state : req.body.state,
            dist : req.body.dist,
            pin : req.body.pin,
            addrs : req.body.addrs
           }
    connection.query(`insert into donate set ?`,donates,function(error,result,column){
        if (error)
            console.log(error)
        else    
             res.json(result);
             
            
    });
}
const donated=(req,res)=>{
    const pno = req.body.pno
    console.log(pno)
    connection.query(`Select * from donate where (pno)=('${pno}')`,(err,results)=>{
        if(results.length===0)
        {
            res.status(400).send("Please Donate first")        
        }
        else{
            res.json(results)
        }
    })

}
module.exports={
    donate : donate,
    donated :donated
}