const mysql=require("mysql2/promise")


const pool=mysql.createPool({
    host:"localhost",
    database:"Rentra",
    password:"SunnySky42!",
    user:"root"
})

module.exports={pool}