const jwt=require("jsonwebtoken")


const AccessToken=(data)=>{

const payload={id:data.id,name:data.full_name,email:data.email}
console.log(data);


    const token=jwt.sign(payload,process.env.JWT_Secret,{expiresIn:'24h'})
    return token
}
const RefreshToken=(data)=>{

const payload={id:data.id,name:data.full_name,email:data.email}
console.log(data);


    const token=jwt.sign(payload,process.env.JWT_Secret,{expiresIn:'7d'})
    return token
}


const VerifyToken=(token)=>{

    console.log("verifying...",token);
    
    return jwt.verify(token,process.env.JWT_Secret)
}

module.exports={AccessToken,RefreshToken,VerifyToken}