const { pool } = require("../db/db");




const handleIslamabadData=async(req,res)=>{
    // console.log("Req, rec");

const islData=await pool.query("select * from islamabad");

// console.log("data",islData);


return res.send({data:islData})

    
}
const handleMurreData=async(req,res)=>{
    // console.log("Req, rec");

const murreData=await pool.query("select * from murre");

// console.log("data",murreData);


return res.send({data:murreData})

    
}
const handleDubaiData=async(req,res)=>{
    // console.log("Req, rec");

const dubData=await pool.query("select * from dubai");

// console.log("data",dubData);


return res.send({data:dubData})

    
}
const handlePindiData=async(req,res)=>{
    // console.log("Req, rec");

const pindiData=await pool.query("select * from pindi");

// console.log("data",pindiData);


return res.send({data:pindiData})

    
}


const handleLahoreData=async(req,res)=>{
    // console.log("Req, rec");

const lahData=await pool.query("select * from lahore");

// console.log("data",lahData);


return res.send({data:lahData})

    
}

const handleDetail=async(req,res)=>{
    console.log("Req, rec");
    const query=req.query

    console.log(query);
    
const [detail]=await pool.query(`select * from ${query.city}_room_details where id=${query.room}`);

console.log("data",detail);


return res.send({detail})

    
}

const handleHostPost=(req,res)=>{
    console.log("o",req.body.actualData,req.files);
    res.send({msg:"ok"})
    
}
module.exports={handleIslamabadData,handleDubaiData,handleMurreData,handlePindiData,handleLahoreData,handleDetail,handleHostPost}