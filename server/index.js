require('dotenv').config()
const express=require("express")
const cors=require("cors")
const path=require("path")
const { router } = require('./routes/routes')
const { handleHostPost } = require('./controllers/controllers')
const app=express()
const multer=require('multer');
const { pool } = require('./db/db')
const {v4 : uuid}=require("uuid")
const { hostRouter } = require('./routes/HostRoute')
const cookieParser = require('cookie-parser')
const { VerifyToken, AccessToken } = require('./JWT/Auth')
const { isLoggedIn } = require('./middleware/isLoggedIn')
const nodemailer=require("nodemailer")



const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
         user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    }
})




const id=uuid();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       return  cb(null,path.join(__dirname, "./hostImages")
)
    },

    filename:(req,file,cb)=>{
        console.log("file",file);
        
return cb(null,`${id}-${file.originalname}`)
    }
})


const uploads=multer({storage})


const allowedOrigins = [
  "http://localhost:5173",  // Vite
  "https://rentra-mern-frontend.onrender.com/" // production
];

app.use(cors(
    {
         origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
        methods:["GET","POST","PATCH","DELETE"],
          credentials: true,    
    }
))

app.use(express.json())
app.use(cookieParser())
app.use("/upload",express.static("./uploads"))
app.use("/host",express.static("./hostImages"))
app.use("/hostProfileImage",express.static("./hostProfileImages"))

app.use("/api",router)



app.post("/host/detail",uploads.single("RoomImage"),async(req,res)=>{
   


// const user_id=await pool.execute(`select id from host where email=${req.}`)

        try {
        const query = `INSERT INTO listings (
    title, description, propertyType, spaceType, 
    address, city, country, 
    maxGuests, bedrooms, beds, bathrooms, minimumStay, 
    pricePerNight, cleaningFee, 
    essentials, features, safety,photos,host_id
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

const values = [
    req.body.title,
    req.body.description,
    req.body.propertyType,
    req.body.spaceType || '',
    req.body.address,
    req.body.city,
    req.body.country,
    Number(req.body.maxGuests),
    Number(req.body.bedrooms),
    Number(req.body.beds),
    Number(req.body.bathrooms),
    Number(req.body.minimumStay),
    Number(req.body.pricePerNight),
    Number(req.body.cleaningFee),
    req.body.essentials, 
    req.body.features,   
    req.body.safety,     
    `http://localhost:8000/host/${id}-${req.file.originalname}`,
        
        req?.user?.id||1
];


    const [result] = await pool.query(query, values);
    console.log("Listing created with ID:", result.insertId);


   res.status(200).send({msg:"data inserted"})

        } catch (error) {
            console.log(error);
           res.status(400).send({msg:"Error"})    
        }
 
})





app.get("/host/detail",async(req,res)=>{

const data=await pool.query(`SELECT 
*
FROM listings AS l
JOIN hostinfo AS h 
    ON l.host_id = h.owner_id`)

    res.status(200).send({msg:data})
})



app.get("/refresh",async(req,res)=>{

    const RefreshToken=req.cookies.RefreshToken;

    console.log("A",RefreshToken);
    if(!RefreshToken){
        return res.status(204).send("No Access Token")
    }

const verify=VerifyToken(RefreshToken);

console.log("Refreshing ver",verify);
if(!verify){
            return res.status(204).send("No Access Token")

}




const generateNewAccessToken=AccessToken(verify)


console.log(generateNewAccessToken);

res.cookie("AccessToken",generateNewAccessToken)





    res.status(200).send({msg:"Refreshed"})
})


app.use("/owner",hostRouter)
















app.post("/sendMail", async (req, res) => {
  const { checkInDate, checkOutDate, guests } = req.body.data;

  const mailConfig = {
    from: "aad769650@gmail.com",
    to: "aad769650@gmail.com",
    subject: `New Booking – ${guests} guest(s)`,
    text: `
New Booking Details

Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}
Number of Guests: ${guests}
    `,
  };

  try {
    await transport.sendMail(mailConfig);
    console.log("Email sent");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.error("Email error:", err.code || err.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});



















app.listen(process.env.PORT||8000,()=>{
  console.log(`server is listening on PORT:8000`);
  
})







