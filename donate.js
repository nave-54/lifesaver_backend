const connection=require("./connection")
const express = require("express");

    const donate=(req,res)=>{
            const donates={
            id : req.body.id,
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
    const pno = req.body.pno
        const updates={
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
    connection.query(`Select * from donate where (pno)=('${pno}')`,(err,result)=>{
        // console.log("hi"+ result +" "+pno)
        if(result.length===0)
        {
            connection.query(`insert into donate set ?`,donates,function(error,result,column){
                     res.json(result);
                     
                    
            });
        }
        else{
            const num = result[0].id
            // console.log(num)
            // const columns = Object.keys(donates).map(column => `${column}='${donates[column]}'`).join(', ')
            connection.query(`update donate set dob =('${updates.dob}'),anum=('${updates.anum}'),bgrp=('${updates.bgrp}'),weight=('${updates.weight}'),gen=('${updates.gen}'),state=('${updates.state}'),dist=('${updates.dist}'),pin=('${updates.pin}'),addrs=('${updates.addrs}')where id=('${num}')`)
            // connection.query(`UPDATE donate SET ${columns} WHERE id='${num}'`)
            // console.log("updated")
            res.status(200).json(result);
        }
    })
}
const donated=(req,res)=>{
    const pno = req.body.pno
    // console.log(pno)
    connection.query(`Select * from donate where (pno)=('${pno}')`,(err,results)=>{
        if(results===null)
        {
            res.status(400).send("Please Donate first")        
        }
        else{
            res.status(200).json(results)
        }
    })

}
module.exports={
    donate : donate,
    donated :donated
}