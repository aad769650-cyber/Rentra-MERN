const { VerifyToken } = require("../JWT/Auth");

const isLoggedIn=(req,res,next)=>{
    const AccessToken=req.cookies.AccessToken;

    console.log("A",AccessToken);
    if(!AccessToken){
        return res.status(204).send("No Access Token")
    }

const verify=VerifyToken(AccessToken);

console.log("verify",verify);
if(!verify){
            return res.status(204).send("No Access Token")

}

req.user=verify
next()

}


module.exports={isLoggedIn}