const bcrypt=require("bcrypt");


const generateHashPassword=async(password)=>{

return await bcrypt.hash(password,10);
}
const compareHashPassword=async(password,hashedPassword)=>{
console.log(password,hashedPassword);

return await bcrypt.compare(password,hashedPassword);
}
module.exports={generateHashPassword,compareHashPassword}