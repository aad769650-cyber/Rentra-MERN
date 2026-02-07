const express=require("express");

const hostRouter=express.Router();
const path=require("path")
const multer=require("multer");
const { v4:uuid } = require("uuid");
const { generateHashPassword, compareHashPassword } = require("../Bcrypt/hashPassword");
const { pool } = require("../db/db");
const { json } = require("stream/consumers");
const { AccessToken, RefreshToken, VerifyToken } = require("../JWT/Auth");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const id=uuid()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../hostProfileImages"))
    },
    filename:(req,file,cb)=>{
        // console.log(file);
        
        cb(null,`${id}-${file.originalname}`)
    }
})

const upload=multer({storage})









hostRouter.post("/register",upload.single("profileImage"),async(req,res)=>{
    try {
console.log(req.file.originalname);
const file=req?.file?.originalname;
const hashedPassword=await generateHashPassword(req.body.password);

const profileImg=`http://localhost:8000/hostProfileImage/${id}-${file}`
    
const data=await pool.execute(`INSERT INTO hostinfo (full_name, email, password_hash, profile_picture_url)
VALUES (?,?,?,?)`,
[
    req.body.name,
    req.body.email,
   hashedPassword,
profileImg
    

])
// console.log(hashedPassword);

const generateRefreshToken=RefreshToken(data)
const generateAccessToken=AccessToken(data)


console.log(generateAccessToken);

res.cookie("AccessToken",generateAccessToken)
res.cookie("RefreshToken",generateRefreshToken)

    



return  res.status(200).send({msg:"ok data inserted successfully"})
} catch (error) {
    console.log("error in code");
    
    return  res.status(400).send({msg:error})

}

})



hostRouter.post("/login",async(req,res)=>{

console.log(req.body);

   const [data]=await pool.query(`select * from hostinfo where email=?`,[req.body.email])
   console.log(data);
   
const verifyPassword=await compareHashPassword(req.body.password,data[0].password_hash)

console.log(verifyPassword);

// const isVerified=await verifyPassword
if(verifyPassword){
console.log(verifyPassword,req.body.password,data.password_hash);


const generateRefreshToken=RefreshToken(req.body)
const generateAccessToken=AccessToken(req.body)


console.log(generateAccessToken);

res.cookie("AccessToken",generateAccessToken)
res.cookie("RefreshToken",generateRefreshToken)

return  res.status(200).send({msg:"ok login and token created successfully"})

}else{
    console.log("not match");
    return  res.status(400).send({msg:"Wrong Email or password"})

}


    




})



hostRouter.get("/dashBoard",isLoggedIn,(req,res)=>{
    console.log("req received");
    
    res.status(200).send({msg:"Access Host DashBoard"}

        
    )
})


hostRouter.get("/profileInfo",async(req,res)=>{


    // console.log("req received",req.cookies.RefreshToken);
    const verify=VerifyToken(req?.cookies?.AccessToken);
    
    console.log("verify",verify.email);



const [data]=await pool.execute(`select * from hostinfo where email=?`,[verify.email])
console.log(data);


    return res.status(200).send({msg:data})


})


hostRouter.get("/AllPost",async(req,res)=>{


    // console.log("req received",req.cookies.RefreshToken);




const [data]=await pool.execute(`SELECT 
*
FROM listings AS l
JOIN hostinfo AS h 
    ON l.host_id = h.owner_id;
    `)
console.log(data);


    return res.status(200).send({msg:data})


})





hostRouter.patch("/updateStatus",async(req,res)=>{
    console.log(req.body);
const id=req?.body?.id
const [data]=await pool.execute(`update  listings set status='approved' where id=?`,[id])


console.log(data);

       return res.status(200).send({msg:"ok"})


})

hostRouter.patch("/updateStatusReject",async(req,res)=>{
    console.log(req.body);
const id=req?.body?.id
const [data]=await pool.execute(`update  listings set status='rejected' where id=?`,[id])


console.log(data);

       return res.status(200).send({msg:"ok"})


})


hostRouter.delete("/delete",async(req,res)=>{
    console.log(req.body);
const id=req?.body?.id
const [data]=await pool.execute(`delete from listings where id=?`,[id])


console.log(data);

       return res.status(200).send({msg:"ok"})


})
hostRouter.get("/logout",async(req,res)=>{
    console.log(req.body);
res.clearCookie("AccessToken")
res.clearCookie("RefreshToken")

       return res.status(200).send({msg:"ok"})


})
module.exports={hostRouter}